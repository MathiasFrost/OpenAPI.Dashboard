<script lang="ts">
	import type { EndpointDefinition } from "$lib/core/models/EndpointDefinition";
	import { getTypeName } from "$lib/core/models/TypeCode";

	export let endpoint: EndpointDefinition | null;

	async function fetchEndpoints(): Promise<EndpointDefinition[]> {
		const res = await fetch("http://localhost:5000/V1/Test/Endpoints");
		return await res.json();
	}

	let promise: Promise<EndpointDefinition[]> = fetchEndpoints();
</script>

<button class="btn-pink m-1" style="float: right;" on:click={() => (promise = fetchEndpoints())}>Refetch</button>
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
			{#each endpoints as endpointItem}
				{@const badge = endpointItem.httpMethod?.toLowerCase() ?? "unknown"}
				{@const codeName = getTypeName(endpointItem.returnsDefinition.typeDefinition.typeCode)}
				<tr on:click={() => (endpoint = endpointItem)}>
					<td>
						<span class={`method-badge ${badge}`} />
						<b>{endpointItem.httpMethod}</b>
					</td>
					<td>{endpointItem.relativePath}</td>
					<td>{codeName}</td>
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

<style lang="scss">
	@use "src/style/var";

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
