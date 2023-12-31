import createPersistedStore from "~/util/createPersistedStore";
import { isFocusing } from "./timer";
import { createEffect } from "solid-js";
import {
    onWebsiteAddedThroughExtension,
    setAllowedApps as nativeSetAllowedApps,
    setAllowedWebsites as nativeSetAllowedWebsites, setTaskManager, setTerminal
} from "~/bindings/app";

export interface TimerOptions {
    allowPause: boolean;
    allowCancel: boolean;
    allowSettings: boolean;
    allowTaskManager: boolean;
    allowTerminal: boolean;
}

export const [allowedWebsites, setAllowedWebsites] = createPersistedStore<string[]>(
    "fc.allowedWebsites",
    () => []
);

export const [allowedApps, setAllowedApps] = createPersistedStore<string[]>(
    "fc.allowedApps",
    () => []
);

export const [options, setOptions] = createPersistedStore<TimerOptions>(
    "fc.timerOptions",
    createDefaultOptions
);

createEffect(async () => await nativeSetAllowedApps(allowedApps));
createEffect(async () => await nativeSetAllowedWebsites(allowedWebsites));
createEffect(async () => await setTerminal(options.allowTerminal));
createEffect(async () => await setTaskManager(options.allowTaskManager));

// noinspection JSIgnoredPromiseFromCall
onWebsiteAddedThroughExtension(website => {
    setAllowedWebsites(v => [...v, website])
});

export function createDefaultOptions(): TimerOptions {
    return {
        allowCancel: true,
        allowPause: true,
        allowSettings: true,
        allowTaskManager: true,
        allowTerminal: true
    };
}

export function canOpenSettings(): boolean {
    return options.allowSettings || !isFocusing();
}
