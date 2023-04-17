import { ParameterDefinition } from "$lib/core/models/ParameterDefinition";
import { ReturnDefinition } from "$lib/core/models/ReturnDefinition";
import { Unknown } from "../uncertainty/Unknown";

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | null;

export class EndpointDefinition {
	relativePath: string | null;

	httpMethod: HTTPMethod;

	parameters: ParameterDefinition[];

	returnsDefinition: ReturnDefinition;

	public constructor(json: unknown) {
		this.relativePath = new Unknown<string | null>(json.relativePath).ensureType("string", null).value;
		this.httpMethod = new Unknown<HTTPMethod>(json.httpMethod)
			.ensureType("string", null)
			.ensureValue("GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS", null).value;
		this.parameters = ParameterDefinition.deserializeArray(json.parameters);
		this.returnsDefinition = new ReturnDefinition(json);
	}
}
