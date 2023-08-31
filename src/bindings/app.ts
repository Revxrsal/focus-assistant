import { invoke } from "@tauri-apps/api";

export async function setAllowedApps(value: string[]) {
    await invoke("set_allowed_apps", {
        value
    });
}

export async function setAllowedWebsites(value: string[]) {
    await invoke("set_allowed_websites", {
        value
    });
}