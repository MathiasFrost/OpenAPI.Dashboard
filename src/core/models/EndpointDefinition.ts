import type { ParameterDefinition } from "$core/models/ParameterDefinition";
import type { ReturnDefinition } from "$core/models/ReturnDefinition";

export interface EndpointDefinition {
	relativePath: string | null;

	httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | null;

	parameters: ParameterDefinition[];

	returnsDefinition: ReturnDefinition;
}
