export abstract class HttpClientBase {
	protected baseAddress?: string;

	protected constructor(baseAddress?: string) {
		this.baseAddress = baseAddress;
	}

	public buildURL(requestUri = ""): URL | string {
		return this.baseAddress ? new URL(requestUri, this.baseAddress) : requestUri;
	}

	protected async get(requestUri = ""): Promise<Response> {
		return await fetch(this.buildURL(requestUri));
	}
}
