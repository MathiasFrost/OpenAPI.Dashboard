<template>
<main>
	<div class="p-3">
		<h1 class="text-2xl">ASP.NET Core API Dashboard</h1>
	</div>
	<p v-if="pending" class="text-gray-300">Loading...</p>
	<pre v-else-if="error" class="text-red-500">{{ JSON.stringify(error, null, 4) }}</pre>
	<table v-else class="table">
		<thead>
		<tr>
			<th>Method</th>
			<th>Path</th>
			<th>Return</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="endpoint in endpoints">
			<td>
				<span v-if="endpoint.httpMethod === 'GET'" class="method-badge get"></span>
				<span v-else-if="endpoint.httpMethod === 'POST'" class="method-badge post"></span>
				<span v-else-if="endpoint.httpMethod === 'PUT'" class="method-badge put"></span>
				<span v-else-if="endpoint.httpMethod === 'PATCH'" class="method-badge patch"></span>
				<span v-else-if="endpoint.httpMethod === 'DELETE'" class="method-badge delete"></span>
				<span v-else-if="endpoint.httpMethod === 'HEAD'" class="method-badge head"></span>
				<span v-else-if="endpoint.httpMethod === 'OPTIONS'" class="method-badge options"></span>
				<span v-else class="method-badge unknown"></span>
				<b>{{ endpoint.httpMethod }}</b>
			</td>
			<td>{{ endpoint.relativePath }}</td>
			<td>{{ getTypeName(endpoint.returnsDefinition.typeDefinition.typeCode) }}</td>
		</tr>
		</tbody>
	</table>
</main>
</template>

<script lang="ts" setup>
import { EndpointDefinition } from "~/models/EndpointDefinition";
import { getTypeName } from "~/models/TypeCode";

const config = useRuntimeConfig().public;

const {
	data: endpoints,
	pending,
	refresh,
	error
} = await useFetch<EndpointDefinition[]>(() => "/V1/Test/Endpoints", { baseURL: config.BACKEND_URL });
refresh();
</script>

<style lang="stylus" scoped>
@require "../assets/variables.styl"

.table
	width: 100%
	border-collapse: collapse

	tr
		background-color: secondary

		&:hover
			background-color: secondary-light

		&:last-child
			td
				border-bottom-color: muted

	th
		font-size: smaller
		text-align: left
		color: muted
		border-color: dim
		border-bottom-color: muted
		border-style: solid
		border-bottom-width: 2px
		border-top-width: 1px
		border-right-style: none

		&:first-child
			border-left-style: none

	td, th
		padding: 0.4rem 0.8rem

	td
		font-size: small;
		border: 1px solid dim
		border-right-style: none

		&:first-child
			border-left-style: none

.method-badge
	border-right-width: 1px
	border-right-style: solid
	width: 2rem
	margin-right: 1rem

	&.get
		border-color: blueviolet

	&.post
		border-color: cyan

	&.put
		border-color: deeppink

	&.patch
		border-color: palegreen

	&.delete
		border-color: crimson

	&.head
		border-color: ghostwhite

	&.options
		border-color: orangered

	&.unknown
		border-color: gray
</style>
