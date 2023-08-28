import { reconcile } from "solid-js/store";
import { CancelReason, startTimer as nativeStartTimer, StopFn } from "~/bindings/timer";
import { minimizeUnallowedWindows } from "~/bindings/window";
import createPersistedStore from "~/util/createPersistedStore";
import { allowedApps } from "./options";
import { startFocus, stopFocus } from "~/bindings/focus";
import { createEffect } from "solid-js";
import { sendNotification } from "@tauri-apps/api/notification";

export type TimerState = "not started" | "paused" | "running";

export interface Timer {
    state: TimerState;
    time: number;
}

export function createDefaultTimer(): Timer {
    return {
        state: "not started",
        time: 300
    };
}

export const [timer, setTimer] = createPersistedStore<Timer>(
    "fc.timer",
    createDefaultTimer
);

let stopFn: StopFn | undefined = undefined;

createEffect(async () => {
    if (timer.state == "not started")
        await stopFocus();
    else
        await startFocus();
});

function onTimerFinished() {
    setTimer(reconcile(createDefaultTimer()));
    sendNotification({
        title: "Well done!",
        body: "Your focus session has ended, and all apps are available once again."
    });
}

export function startTimer() {
    stopTimer();
    setTimer("state", "running");
    nativeStartTimer(timer.time, tick, (reason) => {
        switch (reason) {
            case "finished":
                onTimerFinished();
                break;
            case "cancelled":
                break;
            case "paused":
                break;
        }
    }).then((s) => (stopFn = s));
}

export function pauseTimer() {
    setTimer("state", "paused");
    stopFn?.("paused");
}

function stopTimer(reason?: CancelReason) {
    stopFn?.(reason || "cancelled");
}

export function cancelTimer() {
    setTimer(reconcile(createDefaultTimer()));
    stopTimer();
}

function tick(value: number) {
    setTimer("time", value);
    minimizeUnallowedWindows(allowedApps);
}
