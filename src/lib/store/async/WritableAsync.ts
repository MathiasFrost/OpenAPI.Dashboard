import { writable, type StartStopNotifier, type Writable } from 'svelte/store';
import type { AsyncState } from './AsyncState';

/** @inheritDoc */
export interface WritableAsync<T> extends Writable<T> {
    /** Call `asyncData` again
     * @param silent Default `false`. Set to `true` if you don't want to set store to pending before refetching */
    refresh(silent?: boolean): Promise<void>;
}

/** Create a `WritableAsync` store that fetches data asynchronously, i.e. from an API using fetch.
 * @param asyncData Function returning the async data
 * @param placeholder Optional placeholder value to use instead of undefined (pending)
 * @param start Start and stop notifications for subscriptions */
export function writableAsync<T>(
    asyncData: () => Promise<T>,
    placeholder?: T,
    start?: StartStopNotifier<AsyncState<T>>
): WritableAsync<AsyncState<T>> {
    const { subscribe, set, update } = writable<AsyncState<T>>(placeholder, start);

    async function refresh(silent?: boolean): Promise<void> {
        try {
            if (silent !== true) {
                set(placeholder);
            }
            const state = await asyncData();
            set(state);
        } catch (error) {
            console.error(error);
            set(error as Error);
        }
    }

    refresh();

    return {
        subscribe,
        set,
        update,
        refresh
    };
}