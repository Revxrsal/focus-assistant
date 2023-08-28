use std::sync::atomic::{AtomicBool, Ordering};

use tauri::State;

#[derive(Default)]
pub struct FocusState {
    is_focusing: AtomicBool,
}

impl FocusState {
    pub fn new() -> FocusState {
        return FocusState::default();
    }

    pub fn focus(&self) {
        self.is_focusing.store(true, Ordering::SeqCst);
    }

    pub fn unfocus(&self) {
        self.is_focusing.store(false, Ordering::SeqCst);
    }

    pub fn is_focusing(&self) -> bool {
        return self.is_focusing.load(Ordering::SeqCst);
    }
}

#[tauri::command]
pub async fn start_focus(focus_state: State<'_, FocusState>) -> Result<(), ()> {
    focus_state.focus();
    Ok(())
}

#[tauri::command]
pub async fn stop_focus(focus_state: State<'_, FocusState>) -> Result<(), ()> {
    focus_state.unfocus();
    Ok(())
}
