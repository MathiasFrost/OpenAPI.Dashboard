import { ensureDictionary, ensureObject } from '@maal/svelte-data/types';
import { Content } from '$lib/models/Content.js';

export class RequestBody {
	public readonly content: Record<string, Content> = {};

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.content = ensureDictionary(o.content, (s) => new Content(s));
	}
}
