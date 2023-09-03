import { invoke } from "@tauri-apps/api";
import { emit, listen, once } from "@tauri-apps/api/event";

/**
 * The reason the timer was cancelled.
 */
export type CancelReason = "cancelled" | "finished" | "paused";

/**
 * The function to stop the timer
 */
export type StopFn = (reason: CancelReason) => void;

export interface CancelTimerPayload {
    reason: CancelReason;
}

export interface TickTimerPayload {
    newValue: number;
}

/**
 * Starts the timer.
 *
 * @param seconds Timer duration
 * @param onTick invoked on every second
 * @param onCancelled Invoked when the timer is cancelled.
 * @returns The function to cancel the timer.
 */
export async function startTimer(
    seconds: number,
    onTick: (value: number) => void,
    onCancelled: (reason: CancelReason) => void
): Promise<StopFn> {
    await invoke("start_timer", { duration: seconds });
    const stopFn = (reason: CancelReason) => {
        emit("cancelTimer", { reason });
    };
    const unlistenToTick = await listen<TickTimerPayload>(
        "tickTimer",
        (event) => {

            onTick(event.payload.newValue as number);
        }
    );

    await once<CancelTimerPayload>("cancelTimer", (event) => {
        unlistenToTick();
        onCancelled(event.payload.reason);
    });
    return stopFn;
}
