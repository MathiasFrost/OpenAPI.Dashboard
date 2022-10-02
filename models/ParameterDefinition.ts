import { LengthDefinition } from "~/models/LengthDefinition";
import { TypeDefinition } from "~/models/TypeDefinition";

export interface ParameterDefinition
{
	name: string;

	typeDefinition: TypeDefinition;

	isRequired: boolean;

	defaultValue: any;

	bindingSource: string;

	lengthConstraints: LengthDefinition[];
}
