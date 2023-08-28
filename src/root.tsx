// @refresh reload
import { onMount, Suspense } from "solid-js";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import Sidebar from "~/components/sidebar/Sidebar";
import { preferences } from "~/util/preferences";
import { startTimer, timer } from "~/util/timer";
import "./root.css";

export default function Root() {
    let bodyElem: HTMLBodyElement | undefined;
    onMount(() => {
        if (timer.state == "running") startTimer();
        if (bodyElem) {
            bodyElem.classList.add("transition-colors");
            bodyElem.classList.add("duration-300");
        }
    });

    return (
        <Html
            lang="en"
            classList={{
                dark: preferences.darkTheme
            }}
        >
            <Head>
                <Title>Focus Assistant</Title>
                <Meta charset="utf-8" />
                <Meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Body ref={bodyElem}>
                <Suspense>
                    <ErrorBoundary>
                        <Sidebar />
                        <Routes>
                            <FileRoutes />
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    );
}
