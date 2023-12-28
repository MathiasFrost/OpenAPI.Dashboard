import { ensureObject, ensureString } from '@maal/svelte-data/types';

export class Info {
	public readonly title: string = '';

	public readonly version: string = '';

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.title = ensureString(o.title);
		this.version = ensureString(o.version);
	}
}
