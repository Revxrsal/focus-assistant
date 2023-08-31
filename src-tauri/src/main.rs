// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, atomic::AtomicBool};
use std::sync::atomic::Ordering::SeqCst;

use tauri::{Manager, RunEvent, State};
use tokio::sync::Mutex;

use app::FocusOptions;
use focus::{start_focus, stop_focus};
use http::start_http_server;
use minimizer::minimize_unallowed_windows;
use timer::start_timer;

use crate::app::{
    add_app,
    add_website,
    get_allowed_apps,
    get_allowed_websites,
    remove_app,
    remove_website,
    set_allowed_apps,
    set_allowed_websites,
};

mod app;
mod focus;
mod http;
mod minimizer;
mod timer;
mod util;

pub static IS_FOCUSING: AtomicBool = AtomicBool::new(false);

#[tokio::main]
async fn main() {
    let focus_options = Arc::new(Mutex::new(FocusOptions::new(vec![], vec![])));
    {
        let focus_options = Arc::clone(&focus_options);
        tokio::spawn(async move {
            start_http_server(focus_options).await;
        });
    }
    let app = tauri::Builder::default()
        .manage(focus_options)
        .invoke_handler(tauri::generate_handler![
            add_website,
            remove_website,
            get_allowed_websites,
            set_allowed_websites,

            add_app,
            remove_app,
            get_allowed_apps,
            set_allowed_apps,

            minimize_unallowed_windows,

            start_timer,

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
    app.run(|app_handle, event| match event {
        RunEvent::ExitRequested { api, .. } => {
            if IS_FOCUSING.load(SeqCst) {
                api.prevent_exit();
            }
        }
        _ => {}
    });
}
