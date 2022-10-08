import type { TypeDefinition } from "./TypeDefinition";

export interface ReturnDefinition {
	typeDefinition: TypeDefinition;

	mimeTypes: string[];
}
