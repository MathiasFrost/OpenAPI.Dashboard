import { TypeCode } from "./type-code";

export interface TypeDefinition
{
	typeCode: TypeCode;
	
	isArray: boolean;
	
	isEnum: boolean;
	
	validValues: (any | null)[];
	
	properties: TypeDefinition[];
}
