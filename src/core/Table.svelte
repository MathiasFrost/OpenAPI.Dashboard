<script lang="ts">
	import { getTypeName } from "$core/models/TypeCode";
	import type { EndpointDefinition } from "$core/models/EndpointDefinition";
	import Modal from "$core/Modal.svelte";

	let show = false;

	function toggle(): void {
		show = !show;
	}

	async function fetchEndpoints(): Promise<EndpointDefinition[]> {
		const res = await fetch("http://localhost:5000/V1/Test/Endpoints");
		return await res.json();
	}

	let promise: Promise<EndpointDefinition[]> = fetchEndpoints();
</script>

<main style="transition-property: filter" class="duration-300" class:bgClass={show}>
	<div class="p-6 flex justify-between">
		<h1 class="text-3xl font-light tracking-wide">ASP.NET Core API Dashboard</h1>
		<button class="bg-pink-600 hover:bg-pink-500 rounded pt-1 pb-1 pr-3 pl-3" on:click={toggle}>Toggle</button>
	</div>
	<button class="bg-slate-900 hover:bg-slate-800 p-3 rounded" on:click={() => (promise = fetchEndpoints())}>
		Refetch
	</button>
	<table class="table">
		<colgroup>
			<col class="w-20" />
			<col class="w-60" />
			<col class="w-20" />
		</colgroup>
		<thead>
			<tr>
				<th>Method</th>
				<th>Path</th>
				<th>Return</th>
			</tr>
		</thead>
		<tbody>
			{#await promise}
				<tr>
					<td colspan="3" class="text-gray-300 p-3">Loading...</td>
				</tr>
			{:then endpoints}
				{#each endpoints as endpoint}
					<tr>
						<td>
							<span class={"method-badge" + (endpoint.httpMethod?.toLowerCase() ?? "unknown")} />
							<b>{endpoint.httpMethod}</b>
						</td>
						<td>{endpoint.relativePath}</td>
						<td>{getTypeName(endpoint.returnsDefinition.typeDefinition.typeCode)}</td>
					</tr>
				{/each}
			{:catch e}
				<tr>
					<td colspan="3">
						<pre class="text-red-500 p-3">{e.message}</pre>
					</td>
				</tr>
			{/await}
		</tbody>
	</table>

	<Modal bind:show />
</main>

<style lang="scss">
	@use "../style/var";

	.table {
		width: 100%;
		border-collapse: collapse;

		tr {
			background-color: var.$secondary;

			&:last-child {
				td {
					border-bottom-color: var.$muted;
				}
			}
		}

		tbody {
			tr:hover {
				background-color: var.$secondary-light;
			}
		}

		th {
			font-size: smaller;
			text-align: left;
			color: var.$muted;
			border-color: var.$dim;
			border-bottom-color: var.$muted;
			border-style: solid;
			border-bottom-width: 2px;
			border-top-width: 1px;
			border-right-style: none;

			&:first-child {
				border-left-style: none;
			}
		}

		td,
		th {
			padding: 0.4rem 0.8rem;
		}

		td {
			font-size: small;
			border: 1px solid var.$dim;
			border-right-style: none;

			&:first-child {
				border-left-style: none;
			}
		}
	}

	.method-badge {
		border-right-width: 1px;
		border-right-style: solid;
		width: 2rem;
		margin-right: 1rem;

		&.get {
			border-color: blueviolet;
		}

		&.post {
			border-color: cyan;
		}

		&.put {
			border-color: deeppink;
		}

		&.patch {
			border-color: palegreen;
		}

		&.delete {
			border-color: crimson;
		}

		&.head {
			border-color: ghostwhite;
		}

		&.options {
			border-color: orangered;
		}

		&.unknown {
			border-color: gray;
		}
	}
</style>
