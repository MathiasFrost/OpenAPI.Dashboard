import { HttpClientBase } from "$lib/core/http/HttpClientBase";
import type { EndpointDefinition } from "../models/EndpointDefinition";

export class EndpointClient extends HttpClientBase {
	public constructor(baseAddress?: string) {
		super(baseAddress);
	}

	public async getEndpoints(): Promise<EndpointDefinition[]> {
		const res = await this.get("V1/Test/Endpoints");
		return await res.ensureObject();
	}
}
