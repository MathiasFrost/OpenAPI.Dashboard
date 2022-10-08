import type { ParameterDefinition } from "./ParameterDefinition";
import type { ReturnDefinition } from "./ReturnDefinition";

export interface EndpointDefinition {
	relativePath: string | null;

	httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | null;

	parameters: ParameterDefinition[];

	returnsDefinition: ReturnDefinition;
}
