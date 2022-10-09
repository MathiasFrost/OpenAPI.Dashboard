import type { LengthDefinition } from "$lib/core/models/LengthDefinition";
import type { TypeDefinition } from "$lib/core/models/TypeDefinition";

export interface ParameterDefinition {
	name: string;

	typeDefinition: TypeDefinition;

	isRequired: boolean;

	defaultValue: unknown;

	bindingSource: string;

	lengthConstraints: LengthDefinition[];
}
