import createPersistedStore from "~/util/createPersistedStore";
import { isFocusing } from "./timer";

export interface TimerOptions {
    allowPause: boolean;
    allowCancel: boolean;
    allowSettings: boolean;
    allowTaskManager: boolean;
    allowTerminal: boolean;
}

// prettier-ignore
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
