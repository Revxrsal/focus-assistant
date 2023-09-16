// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;
use std::sync::atomic::Ordering::SeqCst;

use parking_lot::RwLock;
use tauri::{Manager, RunEvent};

use http::start_http_server;
use minimizer::minimize_unallowed_windows;
use timer::create_timer;

use crate::focus::{
    commands::{
        set_allowed_apps,
        set_allowed_websites,
        set_task_manager,
        set_terminal,
        start_focus,
        stop_focus,
    },
    FocusStore,
    IS_FOCUSING,
};

mod minimizer;
mod timer   ;
mod util;
mod http;
mod focus;

#[tokio::main]
async fn main() {
    let focus_options = Arc::new(RwLock::new(FocusStore::default()));

    let app = tauri::Builder::default()
        .manage(Arc::clone(&focus_options))
        .invoke_handler(tauri::generate_handler![

            set_allowed_websites,
            set_allowed_apps,
            set_task_manager,
            set_terminal,

            minimize_unallowed_windows,

            create_timer,

            start_focus,
            stop_focus
        ])
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                if IS_FOCUSING.load(SeqCst) {
                    event.window().minimize().unwrap();
                    api.prevent_close();
                }
            }
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");
    {
        let focus_options = Arc::clone(&focus_options);
        let app_handle = app.app_handle();
        tokio::spawn(async move {
            start_http_server(
                focus_options,
                app_handle
            ).await;
        });
    }
    app.run(|_app_handle, event| match event {
        RunEvent::ExitRequested { api, .. } => {
            if IS_FOCUSING.load(SeqCst) {
                api.prevent_exit();
            }
        }
        _ => {}
    });
}
