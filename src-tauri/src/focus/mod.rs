use std::sync::atomic::AtomicBool;

pub static IS_FOCUSING: AtomicBool = AtomicBool::new(false);

pub mod commands;

#[derive(Default)]
pub struct FocusStore {
    allowed_websites: Vec<String>,
    allowed_apps: Vec<String>,
    allow_terminal: bool,
    allow_task_manager: bool,
}

impl FocusStore {
    pub fn allowed_websites(&self) -> &Vec<String> {
        &self.allowed_websites
    }
    pub fn allowed_apps(&self) -> &Vec<String> {
        &self.allowed_apps
    }

    pub fn allowed_websites_mut(&mut self) -> &mut Vec<String> {
        &mut self.allowed_websites
    }

    pub fn allowed_apps_mut(&mut self) -> &mut Vec<String> {
        &mut self.allowed_apps
    }

    pub fn allow_terminal(&self) -> bool {
        self.allow_terminal
    }

    pub fn allow_task_manager(&self) -> bool {
        self.allow_task_manager
    }

    pub fn set_allow_terminal(&mut self, allow_terminal: bool) {
        self.allow_terminal = allow_terminal;
    }

    pub fn set_allow_task_manager(&mut self, allow_task_manager: bool) {
        self.allow_task_manager = allow_task_manager;
    }
}