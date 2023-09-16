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

export async function setTerminal(value: boolean) {
    await invoke("set_terminal", {
        value
    });
}

export async function setTaskManager(value: boolean) {
    await invoke("set_task_manager", {
        value
    });
}