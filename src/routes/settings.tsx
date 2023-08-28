import SwitchButton from "~/components/input/SwitchButton";
import Column from "~/components/layout/Column";
import Header from "~/components/typography/Header";
import { options, setOptions } from "~/util/options";
import { preferences, setPreferences } from "~/util/preferences";

export default function Settings() {
    return (
        <main class={"flex flex-col"}>
            <Column class={"mt-12 mx-6"}>
                <Header size={7} class={"m-8"}>
                    Settings
                </Header>

                {/* Appearance section */}
                <Header size={4} class={"m-8"}>
                    Appearance
                </Header>
                <SwitchButton
                    checked={preferences.darkTheme}
                    onClick={() => setPreferences("darkTheme", (v) => !v)}
                    label={"Dark Mode"}
                />

                {/* Timer options section */}
                <Header size={4} class={"m-8"}>
                    During focus
                </Header>

                <SwitchButton
                    class="mt-4"
                    checked={options.allowCancel}
                    onClick={() => setOptions("allowCancel", (v) => !v)}
                    label={"Allow cancel"}
                />

                <SwitchButton
                    class="mt-4"
                    checked={options.allowPause}
                    onClick={() => setOptions("allowPause", (v) => !v)}
                    label={"Allow pause"}
                />

                <SwitchButton
                    class="mt-4"
                    checked={options.allowSettings}
                    onClick={() => setOptions("allowSettings", (v) => !v)}
                    label={"Allow settings"}
                />

                <SwitchButton
                    class="mt-4"
                    checked={options.allowTaskManager}
                    onClick={() => setOptions("allowTaskManager", (v) => !v)}
                    label={"Allow task manager"}
                />

                <SwitchButton
                    class="mt-4"
                    checked={options.allowTerminal}
                    onClick={() => setOptions("allowTerminal", (v) => !v)}
                    label={"Allow terminal"}
                />
            </Column>
        </main>
    );
}
