import { ensureDictionary, ensureObject, ensureString } from '@maal/svelte-data/types';
import { Info } from '$lib/models/Info.js';
import { Path } from '$lib/models/Path.js';
import { Components } from '$lib/models/Components.js';

export class OpenApiDocument {
	public readonly openApi?: string = '';
	public readonly info: Info = new Info();
	public readonly paths: Record<string, Record<string, Path>> = {};
	public readonly components?: Components;

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.openApi = ensureString(o['openapi']);
		this.info = ensureObject(o.info, (s) => new Info(s));
		this.paths = ensureDictionary(o.paths, (u) => ensureDictionary(u, (s) => new Path(s)));
		if ('components' in o) this.components = ensureObject(o.components, (s) => new Components(s));
	}
}
