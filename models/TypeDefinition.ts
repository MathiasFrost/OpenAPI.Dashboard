import { TypeCode } from "~/models/TypeCode";

export interface TypeDefinition
{
	typeCode: TypeCode;

	isArray: boolean;

	isEnum: boolean;

	validValues: (any | null)[];

	properties: TypeDefinition[];
}
