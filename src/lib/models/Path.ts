import { ensureArray, ensureDictionary, ensureObject, ensureString } from '@maal/svelte-data/types';
import { Parameter } from '$lib/models/Parameter.js';
import { RequestBody } from '$lib/models/RequestBody.js';
import { Response } from '$lib/models/Response.js';

export class Path {
	public readonly tags: string[] = [];

	public readonly parameters?: Parameter[];

	public readonly requestBody?: RequestBody;

	public readonly responses: Record<string, Response> = {};

	public constructor(something?: unknown) {
		if (typeof something === 'undefined') return;
		const o = ensureObject(something);
		this.tags = ensureArray(o.tags, ensureString);
		if ('parameters' in o) this.parameters = ensureArray(o.parameters, (s) => new Parameter(s));
		if ('requestBody' in o) this.requestBody = ensureObject(o.requestBody, (s) => new RequestBody(s));
		this.responses = ensureDictionary(o.responses, (s) => new Response(s));
	}
}
