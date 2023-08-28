import AllowedApps from "~/components/allowlist/AllowedApps";
import AllowedWebsites from "~/components/allowlist/AllowedWebsites";
import Column from "~/components/layout/Column";
import Header from "~/components/typography/Header";
import { allowedApps, allowedWebsites, setAllowedApps, setAllowedWebsites } from "~/util/options";

export default function Blocks() {
    return (
        <main class={"flex flex-col"}>
            <Column class={"mt-12 mx-6"}>
                {/* Blocks section */}
                <Header size={6} class={"m-8"}>
                    Blocked apps & websites
                </Header>
                <AllowedApps
                    items={allowedApps}
                    setItems={setAllowedApps}
                    placeholder="App path"
                />
                <AllowedWebsites
                    items={allowedWebsites}
                    setItems={setAllowedWebsites}
                    placeholder="Keywords, such as 'google', 'stackoverflow', etc."
                />
            </Column>
        </main>
    );
}
