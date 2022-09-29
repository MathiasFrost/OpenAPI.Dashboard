import { ParameterDefinition } from "~/models/ParameterDefinition";
import { ReturnDefinition } from "~/models/ReturnDefinition";

export interface EndpointDefinition
{
	relativePath: string | null;
	
	httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | null;
	
	parameters: ParameterDefinition[];
	
	returnsDefinition: ReturnDefinition;
}
