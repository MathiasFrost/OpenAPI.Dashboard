<script lang="ts">
	import type { Parameter } from '$lib/models/Parameter.js';
	import type { Property } from '$lib/models/Property.js';

	export let param: Parameter | null = null;
	export let props: Record<string, Property> | null = null;

	function getType(format?: string): string {
		switch (format) {
			case 'date-time':
				return 'datetime-local';
			case 'uint64':
			case 'int64':
			case 'uint32':
			case 'int32':
			case 'uint16':
			case 'int16':
			case 'float':
			case 'double':
			case 'decimal':
				return 'number';
			default:
				return 'text';
		}
	}

	function getStep(type?: string): string | undefined {
		switch (type) {
			case 'integer':
				return '1';
			case 'number':
				return '0.1';
		}
	}

	function getMin(type?: string): string | undefined {
		switch (type) {
			case 'integer':
				return '1';
		}
	}

	function getMax(type?: string): string | undefined {
		switch (type) {
			case 'integer':
				return '1';
		}
	}
</script>

{#if param}
	{@const type = getType(param.schema.format)}
	{@const step = getStep(param.schema.type)}
	<label
		>{param.name}
		<input autocomplete="off" placeholder={param.schema.format} {type} {step} required={param.required} name={param.name} />
	</label>
{/if}
{#if props}
	{#each Object.keys(props) as prop}
		{@const value = props[prop]}
		{@const type = getType(value.format)}
		{@const step = getStep(value.type)}
		<label
			>{prop}
			<input autocomplete="off" placeholder={value.format} {type} {step} required={!value.nullable} name={prop} />
		</label>
	{/each}
{/if}

<style lang="scss">
	@use '../../style/var';

	input {
		:not(&[type='checkbox']) {
			width: 99%;
		}

		display: block;
		box-sizing: border-box;
		border: 1px solid var.$muted;
		border-radius: 0.3rem;
		background-color: var.$secondary;
		padding: 0.3rem 0.6rem;
		outline: none;
		color: var.$white;
		margin-top: 0.3rem;
	}

	label {
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
		font-weight: lighter;
		margin-left: 0.3rem;
		color: var.$white;
	}
</style>
