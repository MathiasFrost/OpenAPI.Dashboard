import type { TypeDefinition } from "$core/models/TypeDefinition";

export interface ReturnDefinition {
	typeDefinition: TypeDefinition;

	mimeTypes: string[];
}
