import { Content } from '$lib/models/Content.js';
import { ensureDictionary, ensureObject, ensureString } from '@maal/svelte-data/types';

export class Response {
	public readonly description: string = '';

	public readonly content?: Record<string, Content>;

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.description = ensureString(o.description);
		if ('content' in o) this.content = ensureDictionary(o.content, (s) => new Content(s));
	}
}
