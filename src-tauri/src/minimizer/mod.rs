#[cfg(target_os = "linux")]
mod linux;
#[cfg(target_os = "macos")]
mod macos;
#[cfg(target_os = "windows")]
mod windows;

#[cfg(target_os = "linux")]
use crate::minimizer::linux as sys;
#[cfg(target_os = "macos")]
use crate::minimizer::macos as sys;
#[cfg(target_os = "windows")]
use crate::minimizer::windows as sys;

pub fn minimize_windows(allowed_exes: Vec<String>) {
    sys::minimize_windows(allowed_exes);
}

#[tauri::command]
pub async fn minimize_unallowed_windows(allowed_exes: Vec<String>) -> Result<(), ()> {
    minimize_windows(allowed_exes);
    Ok(())
}