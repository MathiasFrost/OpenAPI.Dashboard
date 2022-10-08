import type { LengthDefinition } from "$core/models/LengthDefinition";
import type { TypeDefinition } from "$core/models/TypeDefinition";

export interface ParameterDefinition {
	name: string;

	typeDefinition: TypeDefinition;

	isRequired: boolean;

	defaultValue: unknown;

	bindingSource: string;

	lengthConstraints: LengthDefinition[];
}
