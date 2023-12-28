<script lang="ts">
	import type { ResponseModel } from '$lib/models/ResponseModel.js';

	export let promise: Promise<ResponseModel> | null;

	let downloader: HTMLAnchorElement | null = null;

	let downloadData = '';

	function preview(response: ResponseModel): void {
		let tab: Window | null = null;
		let url = '';
		if (typeof response.actual === 'string') {
			let blob: Blob | null = null;
			if (response.contentType === 'application/json') {
				blob = new Blob([response.actual], { type: 'application/json' });
			} else if (response.contentType === 'text/html') {
				blob = new Blob([response.actual], { type: 'text/html' });
			} else if (response.contentType === 'text/plain') {
				blob = new Blob([response.actual], { type: 'text/plain' });
			}

			if (!blob) return;
			const url = URL.createObjectURL(blob);

			tab = window.open(url, '_blank');
		}

		if (!tab) return;
		const interval = window.setInterval(() => {
			if (tab?.closed) {
				URL.revokeObjectURL(url);
				window.clearInterval(interval);
			}
		}, 1_000);
	}

	async function copy(response: ResponseModel): Promise<void> {
		if (typeof response.actual === 'string') {
			await window.navigator.clipboard.writeText(response.actual);
		}
	}
</script>

{#if promise}
	{#await promise}
		<div class="color-muted">Loading...</div>
	{:then response}
		{#if typeof response?.actual === 'string'}
			<div class="bar">
				<button class="btn-silver" on:click={() => (promise = null)}>Clear</button>
				<button class="btn-pink" on:click={() => preview(response)}>Open in new tab</button>
				<button class="btn-cyan" on:click={() => copy(response)}>Copy</button>
			</div>
			<div class="code-container">
				{#if response.actual.length > 600_000}
					<span style="color: orange;">Large response has been truncated. Download or open in tab at your own risk.</span>
				{/if}
				<pre><code>{response.actual.substring(0, 600_000)}</code></pre>
			</div>
		{/if}
	{:catch e}
		<div style="color: crimson;">
			{e.message}
			<pre><code>{e.stack}</code></pre>
		</div>
	{/await}
{/if}

<a hidden href={downloadData} bind:this={downloader}>temp</a>

<style lang="scss">
	@use '../../style/var';

	.bar {
		display: flex;
		gap: 0.3rem;
		padding: 1rem 1rem 0 1rem;
	}

	code {
		font-family: 'JetBrains Mono', Consolas, monospace;
		font-size: smaller;
	}

	.code-container {
		margin: 1rem;
		padding: 1rem;
		border-radius: 0.3rem;
		background-color: var.$black;
		max-height: 40rem;
		overflow-y: auto;
	}
</style>
