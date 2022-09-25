import { LengthDefinition } from "./length-definition";
import { TypeDefinition } from "./type-definition";

export interface ParameterDefinition
{
	name: string;
	
	typeDefinition: TypeDefinition;
	
	isRequired: boolean;
	
	defaultValue: any;
	
	bindingSource: string;
	
	lengthConstraints: LengthDefinition[];
}
