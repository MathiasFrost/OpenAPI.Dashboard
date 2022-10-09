<script lang="ts">
	import EndpointTable from "$lib/core/EndpointTable.svelte";
	import type { EndpointDefinition } from "$lib/core/models/EndpointDefinition";
	import Sidebar from "$lib/sidebar/Sidebar.svelte";

	let endpoint: EndpointDefinition | null = null;
</script>

<section>
	<div class="container-md">
		<h1 class="title">ASP.NET Core API Dashboard</h1>
	</div>
	<EndpointTable bind:endpoint />
	<Sidebar bind:endpoint />
</section>
