import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { SetStoreFunction, Store } from "solid-js/store/types/store";

export default function createPersistedStore<T extends object = {}>(
    key: string,
    def: () => T
): [get: Store<T>, set: SetStoreFunction<T>] {
    const json = localStorage.getItem(key);
    let value: T;
    if (json) value = JSON.parse(json);
    else value = def();
    const store = createStore(value);
    createEffect(() => localStorage.setItem(key, JSON.stringify(store[0])));
    return store;
}
