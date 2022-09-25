import { ParameterDefinition } from "./parameter-definition";
import { ReturnDefinition } from "./return-definition";

export interface EndpointDefinition
{
	relativePath: string | null;
	
	httpMethod: string | null;
	
	parameters: ParameterDefinition[];
	
	returnsDefinition: ReturnDefinition;
}
