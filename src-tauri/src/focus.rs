use std::sync::atomic::Ordering;

use crate::IS_FOCUSING;

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
