export type Command = "canAccess" | "addWebsite" | "openApp"

export function commandAccess(canAccess: boolean) {
    return {
        command: "canAccess",
        canAccess
    }
}

export function commandAddWebsite(website: string) {
    return {
        command: "addWebsite",
        website
    }
}

export function onCommand<T>(command: Command, callback: (data: T) => void) {
    chrome.runtime.onMessage.addListener(data => {
        if (data.command === command) {
            callback(data as T)
        }
    });
}