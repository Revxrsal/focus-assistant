/**
 * Formats the time in the format of mm:ss or hh:mm:ss
 */
export function formatTime(seconds: number): string {
    const moreThanHour = seconds < 3600;
    return new Date(seconds * 1000)
        .toISOString()
        .slice(moreThanHour ? 14 : 11, 19);
}

/**
 * Checks whether the system prefers dark theme or not
 */
export function isSystemDarkMode(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Returns the base name of the given path
 *
 * @param path The path
 */
export function getBaseFileName(path: string): string {
    return path.replace(/^.*[\\/]/, "");
}
