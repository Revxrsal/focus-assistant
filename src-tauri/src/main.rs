// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod focus;
mod minimizer;
mod timer;
mod util;

use focus::{start_focus, stop_focus, FocusState};
use tauri::{Manager, RunEvent, State};
use timer::start_timer;
use minimizer::minimize_unallowed_windows;

fn main() {
    let app = tauri::Builder::default()
        .manage(FocusState::new())
        .invoke_handler(tauri::generate_handler![
            minimize_unallowed_windows,
            start_timer,
            start_focus,
            stop_focus
        ])
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                let focus_state: State<'_, FocusState> = event.window().state();
                if focus_state.is_focusing() {
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
            let focus_state: State<'_, FocusState> = app_handle.state();
            if focus_state.is_focusing() {
                api.prevent_exit();
            }
        }
        _ => {}
    });
}
