import { invoke } from "@tauri-apps/api";

export async function startFocus() {
    await invoke("start_focus");
}

export async function stopFocus() {
    await invoke("stop_focus");
}
