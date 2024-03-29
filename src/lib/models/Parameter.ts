import { ensureBoolean, ensureObject, ensureString } from '@maal/svelte-data/types';
import { Schema } from '$lib/models/Schema.js';

export class Parameter {
	public readonly name: string = '';

	public readonly in: string = '';

	public readonly style: string = '';

	public readonly required: boolean = false;

	public readonly schema: Schema = new Schema();

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.name = ensureString(o.name);
		this.in = ensureString(o.in);
		this.style = ensureString(o.style);
		this.required = 'required' in o ? ensureBoolean(o.required) : false;
		this.schema = ensureObject(o.schema, (s) => new Schema(s));
	}
}
