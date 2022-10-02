import { TypeDefinition } from "~/models/TypeDefinition";

export interface ReturnDefinition
{
	typeDefinition: TypeDefinition;

	mimeTypes: string[];
}
