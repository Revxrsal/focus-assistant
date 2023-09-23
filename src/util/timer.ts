import { reconcile } from "solid-js/store";
import { CancelReason, createTimer as nativeStartTimer, StopFn } from "~/bindings/timer";
import { minimizeUnallowedWindows } from "~/bindings/window";
import createPersistedStore from "~/util/createPersistedStore";
import { allowedApps, options } from "./options";
import { startFocus, stopFocus } from "~/bindings/focus";
import { createEffect } from "solid-js";
import { sendNotification } from "@tauri-apps/api/notification";

export type TimerState = "not started" | "paused" | "running";

export interface Timer {
    state: TimerState;
    time: number;
    end?: number;
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
    if (isFocusing())
        await startFocus();
    else
        await stopFocus();
});

export function isFocusing() {
    return timer.state != "not started";
}

function onTimerFinished() {
    setTimer(reconcile(createDefaultTimer()));
    sendNotification({
        title: "Well done!",
        body: "Your focus session has ended, and all apps are available once again."
    });
}

export function startTimer() {
    stopTimer();
    const endDate = new Date()
    endDate.setSeconds(endDate.getSeconds() + timer.time)
    setTimer({
        state: "running",
        end: endDate.getTime()
    });
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
    stopTimer("paused");
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
    let apps = [...allowedApps];
    if (options.allowTaskManager) {
        apps.push("Taskmgr.exe");
    }
    if (options.allowTerminal) {
        apps.push("WindowsTerminal.exe");
        apps.push("cmd.exe");
        apps.push("OpenConsole.exe");
        apps.push("powershell.exe");
    }
    minimizeUnallowedWindows(apps);
}
