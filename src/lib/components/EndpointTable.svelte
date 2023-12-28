<script lang="ts">
	import type { OpenApiDocument } from '$lib/models/OpenApiDocument.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let openApiDocument: OpenApiDocument;

	let mounted = false;

	let currMethod: string | null = null;

	let currPath: string | null = null;

	onMount(() => (mounted = true));

	$: scrollTo(mounted, $page.url.searchParams);

	function scrollTo(mounted: boolean, url: URLSearchParams): void {
		currMethod = url.get('method');
		currPath = url.get('path');
		if (!mounted || !currMethod || !currPath) return;
		document.querySelector('#' + getId(currMethod, currPath))?.scrollIntoView({ behavior: 'smooth' });
	}

	function getId(method: string, path: string) {
		return `${method}${path}`.replaceAll(/[\/{}:]/g, '_');
	}
</script>

<div class="container">
	{#each Object.keys(openApiDocument.paths) as path}
		{@const methods = openApiDocument.paths[path]}
		{#each Object.keys(methods) as method}
			{@const o = methods[method]}
			<a
				id={getId(method, path)}
				class="card"
				href="?path={path}&method={method}"
				data-sveltekit-noscroll
				class:active={currMethod === method && currPath === path}
			>
				<div class="method-badge-container">
					<div class={`method-badge ${method}`} />
					<b>{method.toUpperCase()}</b>
				</div>
				<div class="endpoint-header">{path}</div>
			</a>
		{/each}
	{/each}
</div>

<style lang="scss">
	@use 'sass:map';

	@use '../../style/var';

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem;
	}

	.card {
		background-color: var.$secondary;
		border: 1px solid var.$muted;
		padding: 0.4rem 0.8rem;
		cursor: pointer;
		color: var.$white;
		text-decoration: none;
		border-radius: 0.3rem;
		outline: none;
		display: flex;
		gap: 0.6rem;
		align-items: center;

		&:hover {
			background-color: var.$secondary-light;
		}

		&.active {
			background-color: var.$muted;
		}
	}

	.endpoint-header {
		font-size: larger;
		font-family: 'JetBrains Mono', Consolas, monospace;
		color: #b0cfec;
	}

	.method-badge-container {
		display: flex;
		gap: 0.5rem;
		width: 3.6rem;
	}

	.method-badge {
		width: 0.2rem;
		height: 1rem;

		&.get {
			background-color: blueviolet;
		}

		&.post {
			background-color: cyan;
		}

		&.put {
			background-color: deeppink;
		}

		&.patch {
			background-color: palegreen;
		}

		&.delete {
			background-color: crimson;
		}

		&.head {
			background-color: ghostwhite;
		}

		&.options {
			background-color: orangered;
		}

		&.unknown {
			background-color: gray;
		}
	}
</style>
