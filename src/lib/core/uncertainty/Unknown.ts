type Type = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

export class Unknown<T> {
	private readonly _value: unknown;

	constructor(object: unknown, key: string) {
		if (typeof object !== "object" || !(key in object)) {
		}
		this._value = value;
	}

	public get value(): T {
		return this._value as T;
	}

	public ensureType(...allowedTypes: Type[]): Unknown<T> {
		if (!allowedTypes.includes(typeof this._value)) {
			throw new Error("Value was not of valid type");
		}
		return this;
	}

	public throwIfNullish(): Unknown<T> {
		if (this._value === void 0 || this._value === null) {
			throw new Error("Value was out of range");
		}
		return this;
	}
}
