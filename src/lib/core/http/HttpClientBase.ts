export class HttpResponse {
	public response: Response;

	public constructor(response: Response) {
		this.response = response;
	}
}

export abstract class HttpClientBase {
	public baseAddress: string | undefined;

	protected constructor(baseAddress?: string) {
		this.baseAddress = baseAddress;
		console.log(this.baseAddress);
	}

	protected async get(requestUri = "", params?: URLSearchParams): Promise<Response> {
		const url = new URL(requestUri, this.baseAddress);
		return await fetch(url);
	}
}
