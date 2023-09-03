use std::sync::atomic::Ordering;

use parking_lot::RwLock;
use tauri::State;

use crate::focus::{FocusStore, IS_FOCUSING};

#[tauri::command]
pub async fn set_allowed_websites(
    value: Vec<String>,
    store: State<'_, RwLock<FocusStore>>,
) -> Result<(), ()> {
    let mut options = store.write();
    options.allowed_websites = value;
    Ok(())
}

#[tauri::command]
pub async fn set_allowed_apps(
    value: Vec<String>,
    store: State<'_, RwLock<FocusStore>>,
) -> Result<(), ()> {
    let mut options = store.write();
    options.allowed_apps = value;
    Ok(())
}

#[tauri::command]
pub async fn set_task_manager(
    value: bool,
    store: State<'_, RwLock<FocusStore>>,
) -> Result<(), ()> {
    let mut options = store.write();
    options.allow_task_manager = value;
    Ok(())
}

#[tauri::command]
pub async fn set_terminal(
    value: bool,
    store: State<'_, RwLock<FocusStore>>,
) -> Result<(), ()> {
    let mut options = store.write();
    options.allow_terminal = value;
    Ok(())
}

#[tauri::command]
pub async fn start_focus() -> Result<(), ()> {
    IS_FOCUSING.store(true, Ordering::SeqCst);
    Ok(())
}

#[tauri::command]
pub async fn stop_focus() -> Result<(), ()> {
    IS_FOCUSING.store(false, Ordering::SeqCst);
    Ok(())
}
