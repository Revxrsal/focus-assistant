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
        await sendMessageToTab(tabId, commandAccess(canAccess))
    }
})
