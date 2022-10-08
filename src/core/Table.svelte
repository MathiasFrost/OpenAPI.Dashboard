<script lang="ts">
	import type { getTypeName } from "./models/TypeCode";
	import type { EndpointDefinition } from "./models/EndpointDefinition";
	import Modal from "./Modal.svelte";

	let modal: Modal;

	$: bgClass = modal && modal.show;

	function toggle(): void {
		modal.value.toggle();
	}

	async function fetchEndpoints(): Promise<EndpointDefinition[]> {
		const res = await fetch("/V1/Test/Endpoints");
		return await res.json();
	}

	let promise: Promise<EndpointDefinition[]> = fetchEndpoints();
</script>

<main style="transition-property: filter" class="duration-300" class:bgClass>
	<div class="p-6 flex justify-between">
		<h1 class="text-3xl font-light tracking-wide">ASP.NET Core API Dashboard</h1>
		<button class="bg-pink-600 hover:bg-pink-500 rounded pt-1 pb-1 pr-3 pl-3" on:click={toggle}>Toggle</button>
	</div>
	{#await promise}
		<p class="text-gray-300">Loading...</p>
	{:then endpoints}
		<table class="table">
			<thead>
				<tr>
					<th>Method</th>
					<th>Path</th>
					<th>Return</th>
				</tr>
			</thead>
			<tbody>
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
			</tbody>
		</table>
	{:catch e}
		<pre class="text-red-500 bg-gray-900 p-3">{JSON.stringify(e, null, 4)}</pre>
	{/await}

	<Modal bind:this={modal} />
</main>

<style lang="scss">
	@use "var.scss";

	.table {
		width: 100%;
		border-collapse: collapse;

		tr {
			background-color: secondary;

			&:last-child {
				td {
					border-bottom-color: muted;
				}
			}
		}

		tbody {
			tr:hover {
				background-color: secondary-light;
			}
		}

		th {
			font-size: smaller;
			text-align: left;
			color: muted;
			border-color: dim;
			border-bottom-color: muted;
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
			border: 1px solid dim;
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
