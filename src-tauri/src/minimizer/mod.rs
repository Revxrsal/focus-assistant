#[cfg(target_os = "linux")]
mod linux;
#[cfg(target_os = "macos")]
mod macos;
#[cfg(target_os = "windows")]
mod windows;

use std::sync::Arc;
use parking_lot::RwLock;
use tauri::State;
use crate::focus::FocusStore;
#[cfg(target_os = "linux")]
use crate::minimizer::linux as sys;
#[cfg(target_os = "macos")]
use crate::minimizer::macos as sys;
#[cfg(target_os = "windows")]
use crate::minimizer::windows as sys;

pub fn minimize_windows(allowed_exes: &Vec<String>) {
    sys::minimize_focus(allowed_exes);
}

#[tauri::command]
pub async fn minimize_unallowed_windows(options: State<'_, Arc<RwLock<FocusStore>>>) -> Result<(), ()> {
    let options = options.read();
    minimize_windows(options.allowed_apps());
    Ok(())
}