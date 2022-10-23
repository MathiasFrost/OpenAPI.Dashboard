export class HTTPResponse {
	response: Response;

	public constructor(response: Response) {
		this.response = response;
	}

	public ensureSuccess(): void {
		if (!this.response.ok) {
			throw new Error("Expected success");
		}
	}

	/** Not sure how we know if it is a string or not */
	public async ensureString(): Promise<string> {
		this.ensureSuccess();
		return await this.response.text();
	}

	public async ensureObject<T>(): Promise<T> {
		this.ensureSuccess();
		return await this.response.json();
	}
}

export abstract class HttpClientBase {
	protected baseAddress?: string;

	protected constructor(baseAddress?: string) {
		this.baseAddress = baseAddress;
	}

	public buildURL(requestUri = "", params?: URLSearchParams): URL | string {
		const query = params ? `?${params}` : "";
		return this.baseAddress ? new URL(requestUri + query, this.baseAddress) : requestUri + query;
	}

	protected async get(requestUri = "", params?: URLSearchParams): Promise<HTTPResponse> {
		const res = await fetch(this.buildURL(requestUri, params));
		return new HTTPResponse(res);
	}
}
