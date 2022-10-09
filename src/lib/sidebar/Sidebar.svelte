<script lang="ts">
	import { fly } from "svelte/transition";
	import { onDestroy } from "svelte";
	import type { EndpointDefinition } from "$lib/core/models/EndpointDefinition";

	export let endpoint: EndpointDefinition | null;

	let modal: HTMLDivElement;

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			close();
			return;
		}

		if (e.key === "Tab") {
			// trap focus
			const nodes = modal.querySelectorAll("*");
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
		endpoint = null;
	}

	const previously_focused = typeof document !== "undefined" && <HTMLElement>document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused?.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

{#if endpoint}
	<div transition:fly={{ x: 200, duration: 150 }} class="modal" role="dialog" aria-modal="true" bind:this={modal}>
		<div class="header">
			<h4 class="sidebar-title">{endpoint.httpMethod}: {endpoint.relativePath}</h4>
			<button class="btn-pink" on:click={close}>Close</button>
		</div>
		<hr />
		<slot />
	</div>
{/if}

<style lang="scss">
	@use "src/style/var";

	.sidebar-title {
		margin-bottom: 0;
		margin-top: auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}

	.modal {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: calc(100vw - 4em);
		max-width: 32em;
		padding: 1rem;
		background-color: var.$secondary-light;
	}
</style>
