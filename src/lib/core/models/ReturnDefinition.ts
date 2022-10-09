import type { TypeDefinition } from "$lib/core/models/TypeDefinition";

export interface ReturnDefinition {
	typeDefinition: TypeDefinition;

	mimeTypes: string[];
}
