import type { TypeCode } from "$core/models/TypeCode";

export interface TypeDefinition {
	typeCode: TypeCode;

	isArray: boolean;

	isEnum: boolean;

	validValues: (unknown | null)[];

	properties: TypeDefinition[];
}
