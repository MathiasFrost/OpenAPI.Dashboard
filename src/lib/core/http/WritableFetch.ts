import { writable, type Writable } from "svelte/store";

export interface WritableFetch<T> extends Writable<T> {
	reFetch(): Promise<void>;
}

/** Is undefined when panding */
export type FetchState<T> = undefined | T | Error;

export function writableFetch<T>(fetchData: () => Promise<T>): WritableFetch<FetchState<T>> {
	const { subscribe, set, update } = writable<FetchState<T>>();

	async function reFetch(): Promise<void> {
		try {
			update(() => undefined);
			const state = await fetchData();
			update(() => state);
		} catch (error) {
			update(() => error as Error);
		}
	}

	reFetch();

	return {
		subscribe,
		set,
		update,
		reFetch
	};
}
