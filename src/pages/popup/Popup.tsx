import "../../styles/index.css";
import Button from "@src/components/button/Button";
import Column from "@src/components/layout/Column";
import Spacer from "@src/components/decoration/Spacer";
import { getCurrentTab, sendMessageToBackground } from "@src/utils/extension-utils";
import { commandAddWebsite } from "@src/utils/commands";

export default function Popup() {
    async function addWebsite() {
        try {
            let tab = await getCurrentTab();
            await sendMessageToBackground(commandAddWebsite(tab.url));
        } catch (e) {
        }
    }

    return (
        <main class={"w-full h-full mx-auto my-auto"}>
            <Column class={"center mx-auto my-auto"}>
                <h1 class={"font-bold text-3xl text text-center"}>Focus Assistant</h1>
                <Spacer class={"my-2"} />
                <Button class={"w-40 m-4"} onClick={addWebsite}>
                    Whitelist website
                </Button>
                <Button class={"w-40 m-4"}>
                    Open app
                </Button>
            </Column>
        </main>
    );
}
