import { HttpClientBase } from "$lib/core/http/HttpClientBase";
import type { EndpointDefinition } from "../models/EndpointDefinition";

export class EndpointClient extends HttpClientBase {
	public constructor(baseAddress: string) {
		super(baseAddress);
	}

	public async getEndpoints(): Promise<EndpointDefinition[]> {
		try {
			const res = await fetch();
		} catch (error) {
			return [];
		}
	}
}
