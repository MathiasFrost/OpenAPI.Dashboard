import type { TypeCode } from "$lib/core/models/TypeCode";

export interface TypeDefinition {
	typeCode: TypeCode;

	isArray: boolean;

	isEnum: boolean;

	validValues: (unknown | null)[];

	properties: TypeDefinition[];
}
