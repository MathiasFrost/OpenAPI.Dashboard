<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import EndpointTable from '$lib/components/EndpointTable.svelte';
	import { OpenApiDocument } from '$lib/models/OpenApiDocument.js';
	import Sidebar from '$lib/components/Sidebar.svelte';

	async function getOpenApiDocument(): Promise<OpenApiDocument> {
		const res = await fetch(`${PUBLIC_BACKEND_URL}openapi`);
		return new OpenApiDocument(await res.json());
	}
</script>

<section>
	{#await getOpenApiDocument()}
		<div class="color-muted">Loading...</div>
	{:then openApiDocument}
		<div class="container-md">
			<h1 class="title">{openApiDocument.info.title} {openApiDocument.info.version}</h1>
			<small class="color-muted"><a href="{PUBLIC_BACKEND_URL}openapi">OpenAPI definition</a></small>
		</div>
		<EndpointTable {openApiDocument} />
		<Sidebar {openApiDocument} />
	{:catch e}
		<div style="color: crimson;">
			{e.message}
			<pre><code>{e.stack}</code></pre>
		</div>
	{/await}
</section>

<style lang="scss">
	@use '../style/var';

	.color-muted {
		a {
			:not(&:hover) {
				text-decoration: none;
			}

			&:visited,
			&:hover {
				color: var.$muted;
			}
		}
	}
</style>
