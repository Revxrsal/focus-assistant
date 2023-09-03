use std::path::PathBuf;
use std::ptr::null_mut;
use std::{ffi::OsString, os::windows::prelude::OsStringExt};

use winapi::um::handleapi::CloseHandle;
use winapi::um::processthreadsapi::OpenProcess;
use winapi::um::psapi::GetModuleFileNameExW;
use winapi::um::winnt::{PROCESS_QUERY_INFORMATION, PROCESS_VM_READ};
use winapi::{
    shared::{
        minwindef::{DWORD, MAX_PATH},
        windef::HWND,
    },
    um::winuser::GetWindowThreadProcessId,
};

/// Returns the name of the focus-assistant app.
pub fn get_app_exe_name() -> String {
    return std::env::current_exe()
        .ok()
        .and_then(|pb| pb.file_name().map(|s| s.to_os_string()))
        .and_then(|s| s.into_string().ok())
        .unwrap();
}

pub fn get_window_executable(handle: HWND) -> Option<String> {
    let mut process_id: DWORD = 0;
    unsafe {
        GetWindowThreadProcessId(handle, &mut process_id);
        if process_id == 0 {
            return None;
        }
        let process_handle =
            OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, 0, process_id);
        if process_handle.is_null() {
            return None;
        }
        let mut buffer: Vec<u16> = vec![0; MAX_PATH];
        let buffer_size = buffer.len() as u32;
        let result =
            GetModuleFileNameExW(process_handle, null_mut(), buffer.as_mut_ptr(), buffer_size);
        if result != 0 {
            let executable_name = OsString::from_wide(&buffer[..result as usize]);
            let path = PathBuf::from(executable_name);
            // let executable_name = executable_name.to_string_lossy();
            CloseHandle(process_handle);
            return path
                .file_name()
                .map(|name| name.to_string_lossy().into_owned());
        }
        CloseHandle(process_handle);
    }
    return None;
}
