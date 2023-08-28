import { Show } from "solid-js";
import { cancelTimer, pauseTimer, startTimer, timer } from "~/util/timer";
import TimerSlider from "~/components/TimerSlider";
import { formatTime } from "~/util/util";
import Column from "~/components/layout/Column";
import Row from "~/components/layout/Row";
import Header from "~/components/typography/Header";
import Button from "~/components/button/Button";
import Spacer from "~/components/decoration/Spacer";
import Text from "~/components/typography/Text";
import { options } from "~/util/options";

function CurrentTime() {
    return <Column class={"items-center"}>
        <Header size={5}>
            {formatTime(timer.time)}
        </Header>
    </Column>;
}

function RunningForm() {
    return <Column class={"items-center justify-center"}>
        <Text class={"text-8xl font-bold m-12"}>
            {formatTime(timer.time)}
        </Text>
        <Row>
            <Show when={options.allowCancel}>
                <Button
                    class={"mx-12 bg-red-800 dark:bg-red-800 text-stone-200"}
                    onClick={cancelTimer}
                >
                    Cancel
                </Button>
            </Show>
            <Show when={options.allowPause}>
                <Button
                    class={`mx-12 text-stone-800 ${timer.state == "running" ? "bg-sky-400 dark:bg-sky-700" : "bg-green-400 dark:bg-green-700"}`}
                    onClick={() => {
                        if (timer.state == "running")
                            pauseTimer();
                        else if (timer.state == "paused")
                            startTimer();
                    }}
                >
                    {timer.state == "paused" ? "Resume" : "Pause"}
                </Button>
            </Show>
        </Row>
    </Column>;
}

function NotStartedForm() {
    return <>
        <CurrentTime />
        <TimerSlider />
        <Button onClick={startTimer}>Start</Button>
    </>;
}

export default function Home() {
    return (
        <main class={"flex flex-col justify-center items-center"}>
            <h1 class={"lg:text-7xl text-6xl text font-bold p-12"}>
                Focus session
            </h1>
            <Spacer class={"my-4"} />
            <Show when={timer.state != "not started"} fallback={<NotStartedForm />}>
                <RunningForm />
            </Show>
        </main>
    );
}
