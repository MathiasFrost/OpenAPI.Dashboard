import { HttpClientBase } from "$lib/core/http/HttpClientBase";
import { EndpointDefinition } from "$lib/core/models/EndpointDefinition";

export class EndpointClient extends HttpClientBase {
	public constructor(baseAddress?: string) {
		super(baseAddress);
	}

	public async getApiDefinition(): Promise<EndpointDefinition[]> {
		const res = await this.get("swagger/v1/swagger.json");
		return await res.ensureSuccess().getFromJsonArray((el) => new EndpointDefinition(el));
	}
}
