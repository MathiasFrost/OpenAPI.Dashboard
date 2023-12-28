import type { Schema } from '$lib/models/Schema.js';

export interface ResponseModel {
	readonly description?: string;
	readonly schema?: Schema;
	readonly actual?: unknown;
	readonly contentType?: string;
}
