<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import type { OpenApiDocument } from '$lib/models/OpenApiDocument.js';
	import type { Path } from '$lib/models/Path.js';
	import InputField from '$lib/components/InputField.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ResponseModel } from '$lib/models/ResponseModel.js';
	import ReturnView from '$lib/components/ReturnView.svelte';
	import { Schema } from '$lib/models/Schema.js';
	import { Property } from '$lib/models/Property.js';

	export let openApiDocument: OpenApiDocument;

	let selected: Path | null = null;

	let modal: HTMLElement;

	let currMethod: string | null = null;

	let currPath: string | null = null;

	let promise: Promise<ResponseModel> | null = null;

	function keydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n) => (<HTMLElement>n).tabIndex >= 0);

			let index = document.activeElement ? tabbable.indexOf(document.activeElement) : -1;
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			(<HTMLElement>tabbable[index]).focus();
			e.preventDefault();
		}
	}

	export function close(): void {
		selected = null;
	}

	const previously_focused = typeof document !== 'undefined' && <HTMLElement>document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused?.focus();
		});
	}

	$: updateSelected($page.url.searchParams);

	function updateSelected(url: URLSearchParams): void {
		const newMethod = url.get('method');
		const newPath = url.get('path');
		if (newPath === currPath && newMethod === currMethod) return;

		currPath = newPath;
		currMethod = newMethod;
		promise = null;
		if (!currMethod || !currPath) {
			selected = null;
			return;
		}

		for (const path of Object.keys(openApiDocument.paths)) {
			for (const method of Object.keys(openApiDocument.paths[path])) {
				if (path === currPath && method === currMethod) {
					selected = openApiDocument.paths[path][method];
					return;
				}
			}
		}
	}

	async function execute(this: HTMLFormElement): Promise<void> {
		if (!selected || !currPath) return;

		let requestUri = currPath;
		const url = new URLSearchParams();
		const form = new FormData(this);
		let body: FormData | string | undefined;
		const headers = new Headers();

		async function promiseFactory(): Promise<ResponseModel> {
			if (selected?.parameters) {
				const routeParams = selected.parameters.filter((param) => param.in === 'path');
				for (const param of routeParams) {
					const val = form.get(param.name);
					if (typeof val !== 'string') continue;

					const regEx = new RegExp(`{(${param.name}[^}]+)}`, 'g');
					requestUri = requestUri.replaceAll(regEx, encodeURIComponent(val));
				}

				const queryParams = selected.parameters.filter((param) => param.in === 'query');
				for (const param of queryParams) {
					const val = form.get(param.name);
					if (typeof val !== 'string') continue;

					url.set(param.name, encodeURIComponent(val));
				}
			}

			if (selected?.requestBody) {
				const bodyKey = 'application/json';
				const formKey = 'multipart/form-data';
				if (formKey in selected.requestBody.content) {
					const value = selected.requestBody.content[formKey];
					const res = new FormData();

					function addValue(schema: Schema | Property, key?: string) {
						if (schema instanceof Schema) {
							if (schema.properties) {
								for (let key in schema.properties) {
									addValue(schema.properties[key], key);
								}
							}
						} else if (key) {
							const inputVal = form.get(key);
							res.append(key, `${inputVal}`);
						}
					}

					addValue(value.schema);
					body = res;
				}
			}

			const uri = new URL(`${requestUri}?${url}`, PUBLIC_BACKEND_URL);
			const method = currMethod ?? 'get';
			const res = await fetch(uri, { method, body, headers });

			const response = selected?.responses?.[res.status];
			if (!response) return {};

			let contentType = res.headers.get('content-type');
			if (!contentType) return { description: response.description };

			contentType = contentType.split(';')[0];

			const content = response.content?.[contentType];
			if (!content) return { description: response.description };

			if (content.schema && contentType === 'application/json') {
				const json = await res.json();
				const str = JSON.stringify(json, null, 2);
				return { description: response.description, schema: content.schema, contentType, actual: str };
			} else if (contentType === 'text/html') {
				const html = await res.text();
				return { description: response.description, contentType, actual: html };
			} else if (contentType === 'text/plain') {
				const text = await res.text();
				console.log(text);
				return { description: response.description, contentType, actual: text };
			}

			return {};
		}

		promise = promiseFactory();
	}
</script>

<svelte:window on:keydown={keydown} />

{#if selected}
	<aside transition:fly={{ x: 200, duration: 150 }} class="modal" bind:this={modal}>
		<div class="header {currMethod}">
			<h3 class="sidebar-title">{currMethod?.toUpperCase()}: {currPath}</h3>
			<a class="btn-pink" href="/" data-sveltekit-noscroll>Close</a>
		</div>
		<form on:submit|preventDefault={execute} class="body" on:input={() => console.log('as')}>
			{#if selected.parameters}
				{@const pathParams = selected.parameters.filter((param) => param.in === 'path')}
				{#if pathParams.length}
					<fieldset>
						<legend>Query</legend>
						{#each pathParams as param}
							<InputField {param} />
						{/each}
					</fieldset>
				{/if}

				{@const queryParams = selected.parameters.filter((param) => param.in === 'query')}
				{#if queryParams.length}
					<fieldset>
						<legend>Route</legend>
						{#each queryParams as param}
							<InputField {param} />
						{/each}
					</fieldset>
				{/if}
			{/if}
			{#if selected.requestBody}
				{@const body = 'application/json'}
				{@const form = 'multipart/form-data'}
				{#if body in selected.requestBody.content && selected.requestBody.content[body].schema.properties}
					<fieldset>
						<legend>Body</legend>
						<InputField props={selected.requestBody.content[body].schema.properties} />
					</fieldset>
				{/if}

				{#if form in selected.requestBody.content && selected.requestBody.content[form].schema.properties}
					<fieldset>
						<legend>Form</legend>
						<InputField props={selected.requestBody.content[form].schema.properties} />
					</fieldset>
				{/if}
			{/if}
			<div style="display: flex; justify-content: end; padding: 1rem;">
				<button class="btn-green" type="submit">Execute</button>
			</div>
		</form>

		<ReturnView bind:promise />
	</aside>
{/if}

<style lang="scss">
	@use '../../style/var';

	.body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-radius: 0.3rem;
		padding: 0.6rem;
		border-color: var.$muted;
	}

	legend {
		color: var.$light;
		background-color: var.$secondary-light;
		padding: 0 0.5rem;
	}

	.sidebar-title {
		margin-bottom: 0;
		margin-top: auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid transparent;
		padding: 1rem;

		&.get {
			border-bottom-color: blueviolet;
		}

		&.post {
			border-bottom-color: cyan;
		}

		&.put {
			border-bottom-color: deeppink;
		}

		&.patch {
			border-bottom-color: palegreen;
		}

		&.delete {
			border-bottom-color: crimson;
		}

		&.head {
			border-bottom-color: ghostwhite;
		}

		&.options {
			border-bottom-color: orangered;
		}

		&.unknown {
			border-bottom-color: gray;
		}
	}

	.modal {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: calc(100vw - 4em);
		max-width: 60em;
		background-color: var.$secondary-light;
		box-shadow: rgba(0, 0, 0, 0.4) 0.3rem 0.6rem 0.6rem 1rem;
		overflow-y: auto;
	}
</style>
