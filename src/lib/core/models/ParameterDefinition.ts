import type { LengthDefinition } from "$lib/core/models/LengthDefinition";
import type { TypeDefinition } from "$lib/core/models/TypeDefinition";

export class ParameterDefinition {
	name: string;

	typeDefinition: TypeDefinition;

	isRequired: boolean;

	defaultValue: unknown;

	bindingSource: string;

	lengthConstraints: LengthDefinition[];

	public constructor(json: any) {}

	public static deserializeArray(json: any): ParameterDefinition[] {
		if (!Array.isArray(json)) {
			throw new Error("Was not array");
		}
		return json.map((el) => new ParameterDefinition(el));
	}
}
