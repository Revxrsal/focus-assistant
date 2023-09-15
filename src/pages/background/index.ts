import {addWebsiteToBackend, canAccessWebsite, sendMessageToTab} from "@src/utils/extension-utils";
import {commandAccess, onCommand} from "@src/utils/commands";

interface AddWebsite {
    website: string
}

onCommand<AddWebsite>("addWebsite", async ({website}) => {
    await addWebsiteToBackend(website)
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url || changeInfo.status === "loading") {
        tab = await chrome.tabs.get(tabId);
        let canAccess = await canAccessWebsite(tab.url)
        // await sendMessageToTab(tabId, commandAccess(canAccess))
        await keepTrying(canAccess, tabId)
    }
})

async function keepTrying(canAccess: boolean, tabId: number) {
    try {
        const a = await sendMessageToTab(tabId, commandAccess(canAccess));
    } catch (e) {
        await keepTrying(canAccess, tabId)
    }
}