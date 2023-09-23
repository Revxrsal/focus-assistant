import AllowedApps from "~/components/allowlist/AllowedApps";
import AllowedWebsites from "~/components/allowlist/AllowedWebsites";
import Column from "~/components/layout/Column";
import Header from "~/components/typography/Header";
import { allowedApps, allowedWebsites, canOpenSettings, setAllowedApps, setAllowedWebsites } from "~/util/options";
import { Show } from "solid-js";

export function CannotAccess() {
    return <main>
        <Column class={"center"}>
            <Header size={3}>
                You mischievous little creature 🙈
            </Header>
        </Column>
    </main>;
}

export default function Blocks() {
    return (
        <Show when={canOpenSettings()}
              fallback={<CannotAccess />}>
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
        </Show>
    );
}
