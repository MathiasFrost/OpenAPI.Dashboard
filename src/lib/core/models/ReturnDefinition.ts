import type { TypeDefinition } from "$lib/core/models/TypeDefinition";

export class ReturnDefinition {
	typeDefinition: TypeDefinition;

	mimeTypes: string[];

	public constructor(json: any) {
	}
}
