import createPersistedStore from "~/util/createPersistedStore";
import { isSystemDarkMode } from "./util";

export interface Preferences {
    darkTheme: boolean;
}

export const [preferences, setPreferences] = createPersistedStore<Preferences>(
    "fc.preferences",
    createDefaultPreferences
);

export function createDefaultPreferences(): Preferences {
    return {
        darkTheme: isSystemDarkMode()
    };
}
