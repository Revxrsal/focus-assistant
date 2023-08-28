import { invoke } from "@tauri-apps/api";

export async function minimizeUnallowedWindows(allowedExes: string[]): Promise<void> {
    return invoke("minimize_unallowed_windows", { allowedExes });
}
