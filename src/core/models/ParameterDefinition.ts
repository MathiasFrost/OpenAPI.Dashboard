import type { LengthDefinition } from "./LengthDefinition";
import type { TypeDefinition } from "./TypeDefinition";

export interface ParameterDefinition {
	name: string;

	typeDefinition: TypeDefinition;

	isRequired: boolean;

	defaultValue: any;

	bindingSource: string;

	lengthConstraints: LengthDefinition[];
}
