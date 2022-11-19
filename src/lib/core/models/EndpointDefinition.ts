import type { ParameterDefinition } from "$lib/core/models/ParameterDefinition";
import type { ReturnDefinition } from "$lib/core/models/ReturnDefinition";

export class EndpointDefinition {
	relativePath: string | null;

	httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | null;

	parameters: ParameterDefinition[];

	returnsDefinition: ReturnDefinition;

	public constructor(json: any) {
		if (typeof json !== "object" || json === null) {
			throw new Error("Did not get an object");
		}
		this.relativePath = this.throwIfNotValid(["string"])
	}

	private throwIfNotValid<T>(value: any, allowedTypes: string[], allowedValues: any[]): T {
		if (!allowedTypes.includes(typeof value)) {
			throw new Error("Value was not expected type");
		}
		if (!allowedValues.includes(value)) {
			throw new Error("Value was not out of range");
		}
		return value;
	}

	public static async deserializeArray(response: Response) {
		if (!response.ok) {
			throw new Error("Not success");
		}
		const json = await response.json();
		if (!Array.isArray(json)) {
			throw new Error("Did not get an array");
		}
		return json.map(el => new EndpointDefinition(el));
	}
}
