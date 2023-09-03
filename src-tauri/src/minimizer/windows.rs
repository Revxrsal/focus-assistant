use std::ptr::null_mut;

use winapi::um::winuser::{GetForegroundWindow, SendMessageW, SC_MINIMIZE, WM_SYSCOMMAND};
use winapi::{
    shared::windef::HWND,
    um::winuser::{IsIconic, IsWindowVisible},
};

use crate::util::pids::{get_app_exe_name, get_window_executable};

/// Reference for myself in the future:
///
/// HWND is the window handle, which allows us to access the window API
/// through a pointer (it's an alias for *mut c_void, not a real struct.)
pub fn minimize_windows(mut allowed_exes: Vec<String>) {
    add_allowed_processes(&mut allowed_exes);
    unsafe {
        let active = GetForegroundWindow();
        if active == null_mut() {
            return;
        }
        if let Some(name) = get_window_executable(active) {
            if !allowed_exes.contains(&name) && IsWindowVisible(active) != 0 {
                minimize_window(active);
            }
        }
    }
}

unsafe fn is_minimized(hwnd: HWND) -> bool {
    return IsIconic(hwnd) != 0;
}

unsafe fn minimize_window(hwnd: HWND) {
    if !is_minimized(hwnd) {
        SendMessageW(hwnd, WM_SYSCOMMAND, SC_MINIMIZE, 0);
    }
}

fn add_allowed_processes(allowed_exes: &mut Vec<String>) {
    let app_exe = get_app_exe_name();
    allowed_exes.push(app_exe);
    allowed_exes.push("explorer.exe".into());
}
