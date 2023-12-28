import { ensureBoolean, ensureObject, ensureString } from '@maal/svelte-data/types';

export class Property {
	public readonly type?: string;

	public readonly format?: string;

	public readonly nullable: boolean = false;

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		if ('type' in o) this.type = ensureString(o.type);
		if ('format' in o) this.format = ensureString(o.format);
		this.nullable = 'nullable' in o ? ensureBoolean(o.nullable) : false;
	}
}
