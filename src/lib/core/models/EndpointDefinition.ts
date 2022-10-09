import type { ParameterDefinition } from "$lib/core/models/ParameterDefinition";
import type { ReturnDefinition } from "$lib/core/models/ReturnDefinition";

export interface EndpointDefinition {
	relativePath: string | null;

	httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | null;

	parameters: ParameterDefinition[];

	returnsDefinition: ReturnDefinition;
}
