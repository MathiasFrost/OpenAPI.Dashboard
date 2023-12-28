import { ensureDictionary, ensureObject } from '@maal/svelte-data/types';
import { Schema } from '$lib/models/Schema.js';
import { Encoding } from '$lib/models/Encoding.js';

export class Content {
	public readonly schema: Schema = new Schema();

	public readonly encoding: Record<string, Encoding> = {};

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.schema = ensureObject(o.schema, (s) => new Schema(s));
		if ('encoding' in o) this.encoding = ensureDictionary(o.encoding, (s) => new Encoding(s));
	}
}
