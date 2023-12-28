import { ensureObject, ensureString } from '@maal/svelte-data/types';

export class Encoding {
	public readonly style: string = '';

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.style = ensureString(o.style);
	}
}
