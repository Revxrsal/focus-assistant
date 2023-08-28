use std::time::Duration;

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use tokio::{sync::mpsc::Receiver, task::AbortHandle, time::interval};

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TickPayload {
    new_value: u32,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CancelPayload {
    reason: CancelReason,
}

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum CancelReason {
    Cancelled,
    Finished,
    Paused,
}

///  Starts a timer. This exposes 2 events:
///  1. tickTimer: Invoked every time the tick timer changes.
///  2. cancelTimer: Emitted (or received) when the timer is cancelled.
#[tauri::command]
pub async fn start_timer(duration: u32, app_handle: AppHandle) {
    // Sleeping for 1s fixes so many weird bugs. It works, don't touch it.
    // tokio::time::sleep(Duration::from_secs(1)).await;
    let (mut rx, abort_handle) = schedule_timer(duration);
    app_handle.once_global("cancelTimer", move |_event| {
        abort_handle.abort();
        // rx.close();
    });
    tokio::spawn(async move {
        while let Some(value) = rx.recv().await {
            app_handle
                .emit_all("tickTimer", TickPayload { new_value: value })
                .unwrap();
            if value <= 0 {
                app_handle
                    .emit_all(
                        "cancelTimer",
                        CancelPayload {
                            reason: CancelReason::Finished,
                        },
                    )
                    .unwrap();
            }
        }
    });
}

fn schedule_timer(seconds: u32) -> (Receiver<u32>, AbortHandle) {
    let (tx, rx) = tokio::sync::mpsc::channel::<u32>(100);
    let handle = tokio::spawn(async move {
        let mut value = seconds;
        let mut interval = interval(Duration::from_secs(1));
        interval.tick().await;
        tx.send(value).await.unwrap();
        loop {
            interval.tick().await;
            value = value.wrapping_sub(1);
            tx.send(value).await.unwrap();
        }
    });
    return (rx, handle.abort_handle());
}
