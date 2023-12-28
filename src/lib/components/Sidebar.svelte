<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import type { OpenApiDocument } from '$lib/models/OpenApiDocument.js';
	import type { Path } from '$lib/models/Path.js';

	export let openApiDocument: OpenApiDocument;

	let selected: Path | null = null;

	let modal: HTMLElement;

	let currMethod: string | null = null;

	let currPath: string | null = null;

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
		currMethod = url.get('method');
		currPath = url.get('path');
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
</script>

<svelte:window on:keydown={keydown} />

{#if selected}
	<aside transition:fly={{ x: 200, duration: 150 }} class="modal" bind:this={modal}>
		<div class="header {currMethod}">
			<h3 class="sidebar-title">{currMethod?.toUpperCase()}: {currPath}</h3>
			<a class="btn-pink" href="/" data-sveltekit-noscroll>Close</a>
		</div>
		<slot />
	</aside>
{/if}

<style lang="scss">
	@use '../../style/var';

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
	}
</style>
