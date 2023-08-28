use std::{ffi::OsString, os::windows::prelude::OsStringExt};

use winapi::{
    shared::{minwindef::{DWORD, MAX_PATH}, windef::HWND},
    um::{tlhelp32::{
        CreateToolhelp32Snapshot, Process32FirstW, Process32NextW, PROCESSENTRY32W,
        TH32CS_SNAPPROCESS,
    }, winuser::GetWindowThreadProcessId},
};

use super::trim_null_char;

/// Returns the name of the focus-assistant app.
pub fn get_app_exe_name() -> String {
    return std::env::current_exe()
        .ok()
        .and_then(|pb| pb.file_name().map(|s| s.to_os_string()))
        .and_then(|s| s.into_string().ok())
        .unwrap();
}

pub fn get_window_process_id(handle: HWND) -> DWORD {
    let mut process_id: DWORD = 0;
    unsafe {
        GetWindowThreadProcessId(handle, &mut process_id);
    }
    process_id
}

pub fn map_exes_to_pids(exes: Vec<&str>) -> Vec<DWORD> {
    let mut pids: Vec<DWORD> = Vec::new();
    let mut process_entry: PROCESSENTRY32W = PROCESSENTRY32W {
        dwSize: std::mem::size_of::<PROCESSENTRY32W>() as DWORD,
        cntUsage: 0,
        th32ProcessID: 0,
        th32DefaultHeapID: 0,
        th32ModuleID: 0,
        cntThreads: 0,
        th32ParentProcessID: 0,
        pcPriClassBase: 0,
        dwFlags: 0,
        szExeFile: [0; MAX_PATH],
    };
    unsafe {
        let snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if Process32FirstW(snapshot, &mut process_entry) == 1 {
            loop {
                let exe_name = OsString::from_wide(&process_entry.szExeFile);
                if let Some(exe_name) = exe_name.to_str() {
                    if exes.contains(&trim_null_char(exe_name)) {
                        pids.push(process_entry.th32ProcessID);
                    }
                }

                if Process32NextW(snapshot, &mut process_entry) != 1 {
                    break;
                }
            }
        }
    }
    pids
}
