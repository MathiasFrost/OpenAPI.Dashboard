import { ensureDictionary, ensureObject } from '@maal/svelte-data/types';
import { Schema } from '$lib/models/Schema.js';

export class Components {
	public readonly schemas: Record<string, Schema> = {};

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.schemas = ensureDictionary(o.schemas, (s) => new Schema(s));
	}
}
