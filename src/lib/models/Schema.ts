import { ensureDictionary, ensureObject, ensureString } from '@maal/svelte-data/types';
import { Property } from '$lib/models/Property.js';

export class Schema {
	public readonly type?: string;

	public readonly format?: string;

	public readonly ref?: string;

	public readonly properties?: Record<string, Property>;

	public readonly additionalProperties?: boolean | Schema;

	public readonly items?: Schema;

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		if ('type' in o) this.type = ensureString(o.type);
		if ('format' in o) this.format = ensureString(o.format);
		if ('$ref' in o) this.ref = ensureString(o['$ref']);
		if ('properties' in o) this.properties = ensureDictionary(o.properties, (s) => new Property(s));
		if ('additionalProperties' in o) {
			if (typeof o.additionalProperties === 'boolean') this.additionalProperties = o.additionalProperties;
			else this.additionalProperties = ensureObject(o.additionalProperties, (s) => new Schema(s));
		}

		if ('items' in o) this.items = ensureObject(o.items, (s) => new Schema(s));
	}
}
