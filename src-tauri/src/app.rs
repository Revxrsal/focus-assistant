use std::sync::Arc;

use tauri::State;
use tokio::sync::Mutex;

#[derive(Default)]
pub struct FocusOptions {
    allowed_websites: Vec<String>,
    allowed_apps: Vec<String>,
}

impl FocusOptions {
    pub fn new(allowed_websites: Vec<String>, allowed_apps: Vec<String>) -> Self {
        Self {
            allowed_websites,
            allowed_apps,
        }
    }

    pub fn allowed_apps(&self) -> &Vec<String> {
        return &self.allowed_apps;
    }

    pub fn allowed_websites(&self) -> &Vec<String> {
        return &self.allowed_websites;
    }

    pub fn remove_app(&mut self, app: String) {
        let index = self.allowed_apps.iter().position(|x| *x == app).unwrap();
        self.allowed_apps.remove(index);
    }

    pub fn remove_website(&mut self, website: String) {
        let index = self
            .allowed_websites
            .iter()
            .position(|x| *x == website)
            .unwrap();
        self.allowed_websites.remove(index);
    }
}

#[tauri::command]
pub async fn add_website(
    website: String,
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<(), ()> {
    let mut options = options.lock().await;
    options.allowed_apps.push(website);
    Ok(())
}

#[tauri::command]
pub async fn remove_website(
    website: String,
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<(), ()> {
    options.lock().await.remove_website(website);
    Ok(())
}

#[tauri::command]
pub async fn add_app(
    website: String,
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<(), ()> {
    options.lock().await.allowed_apps.push(website);
    Ok(())
}

#[tauri::command]
pub async fn remove_app(
    app: String,
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<(), ()> {
    options.lock().await.remove_app(app);
    Ok(())
}

#[tauri::command]
pub async fn get_allowed_apps(
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<Vec<String>, ()> {
    return Ok(options.lock().await.allowed_apps.clone());
}

#[tauri::command]
pub async fn get_allowed_websites(
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<Vec<String>, ()> {
    return Ok(options.lock().await.allowed_websites.clone());
}

#[tauri::command]
pub async fn set_allowed_apps(
    value: Vec<String>,
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<(), ()> {
    let mut options = options.lock().await;
    options.allowed_apps = value;
    return Ok(());
}

#[tauri::command]
pub async fn set_allowed_websites(
    value: Vec<String>,
    options: State<'_, Arc<Mutex<FocusOptions>>>,
) -> Result<(), ()> {
    let mut options = options.lock().await;
    options.allowed_websites = value;
    Ok(())
}
