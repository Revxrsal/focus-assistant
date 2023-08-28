use std::ptr::null_mut;
use winapi::um::winuser::GetForegroundWindow;
use winapi::{
    shared::{
        minwindef::{DWORD, WPARAM},
        windef::HWND,
    },
    um::winuser::{IsIconic, IsWindowVisible, SendMessageW, SC_MINIMIZE, WM_SYSCOMMAND},
};

use crate::util::pids::{get_app_exe_name, get_window_process_id, map_exes_to_pids};

/// Reference for myself in the future:
///
/// HWND is the window handle, which allows us to access the window API
/// through a pointer (it's an alias for *mut c_void, not a real struct.)
pub fn minimize_windows(allowed_exes: Vec<String>) {
    let allowed_pids: Vec<DWORD> = get_allowed_processes(allowed_exes);
    unsafe {
        let active = GetForegroundWindow();
        if active != null_mut() {
            minimize_if_not_allowed(active, &allowed_pids);
        }
    }
}

unsafe fn minimize_if_not_allowed(hwnd: HWND, allowed_pids: &Vec<DWORD>) {
    let window_pid = get_window_process_id(hwnd);
    if !allowed_pids.contains(&window_pid) && IsWindowVisible(hwnd) != 0 {
        minimize_window(hwnd);
    }
}

unsafe fn is_minimized(hwnd: HWND) -> bool {
    return IsIconic(hwnd) != 0;
}

unsafe fn minimize_window(hwnd: HWND) {
    if !is_minimized(hwnd) {
        SendMessageW(hwnd, WM_SYSCOMMAND, SC_MINIMIZE as WPARAM, 0);
    }
}

fn get_allowed_processes(mut allowed_exes: Vec<String>) -> Vec<DWORD> {
    let app_exe = get_app_exe_name();
    allowed_exes.push(app_exe);
    allowed_exes.push("explorer.exe".into());
    let allowed_exes_as_refs: Vec<&str> = allowed_exes.iter().map(AsRef::as_ref).collect();
    map_exes_to_pids(allowed_exes_as_refs)
}
