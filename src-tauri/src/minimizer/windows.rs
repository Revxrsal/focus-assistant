use std::ptr::null_mut;

use winapi::um::winuser::{
    GetForegroundWindow, SendMessageW, SC_CLOSE, SC_MINIMIZE, WM_SYSCOMMAND,
};
use winapi::{
    shared::windef::HWND,
    um::winuser::{IsIconic, IsWindowVisible},
};

use crate::util::processes::{get_window_executable, APP_NAME};
use crate::util::processes::{TASK_MANAGER, WINDOWS_EXPLORER};

/// Reference for myself in the future:
///
/// HWND is the window handle, which allows us to access the window API
/// through a pointer (it's an alias for *mut c_void, not a real struct.)
pub fn minimize_focus(allowed_apps: &Vec<String>) {
    unsafe {
        let active = GetForegroundWindow();
        if active == null_mut() {
            return;
        }
        if let Some(name) = get_window_executable(active) {
            if allowed_apps.contains(&name) {
                return;
            }
            if name == WINDOWS_EXPLORER {
                return;
            }
            if APP_NAME.eq(&name) {
                return;
            }
            if !(IsWindowVisible(active) != 0) {
                return;
            }
            if name == TASK_MANAGER {
                // The Task manager should have been inside the allowed_options.
                SendMessageW(active, WM_SYSCOMMAND, SC_CLOSE, 0);
                return;
            }

            minimize_window(active);
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
