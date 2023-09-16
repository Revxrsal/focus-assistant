import Tab = chrome.tabs.Tab;

export async function getCurrentTab(): Promise<Tab> {
    return chrome.tabs.query({currentWindow: true, active: true}).then(v => v[0])
}

export async function canAccessWebsite(website: string): Promise<boolean> {
    return fetch("http://localhost:4455/canAccessWebsite", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({website})
    })
        .then(resp => resp.json())
        .then(v => v.canAccess as boolean)
        .catch(() => true)
}

export async function addWebsiteToBackend(website: string) {
    await fetch("http://localhost:4455/addWebsite", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({website})
    });
}

export async function sendMessageToTab(tabId: number, message: any) {
    return chrome.tabs.sendMessage(tabId, message)
}

export async function sendMessageToBackground(message: any) {
    return chrome.runtime.sendMessage(message)
}