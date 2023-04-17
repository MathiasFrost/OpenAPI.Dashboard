declare global {
	interface Response {
		ensureSuccess(): Response;

		getFromJsonArray<T>(ctor: (el: unknown) => T): Promise<T[]>;

		getFromJson<T>(ctor: (el: unknown) => T): Promise<T>;
	}
}

Response.prototype.ensureSuccess = function (): Response {
	if (!this.ok) {
		throw new Error("Was not success");
	}
	return this;
};

Response.prototype.getFromJsonArray = async function <T>(ctor: (el: unknown) => T): Promise<T[]> {
	const json = await this.json();
	if (!Array.isArray(json)) {
		throw new Error("Was not array");
	}
	return json.map(ctor);
};

Response.prototype.getFromJson = async function <T>(ctor: (el: unknown) => T): Promise<T> {
	const json = await this.json();
	if (typeof json !== "object") {
		throw new Error("Was not object");
	}
	return ctor(json);
};

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
