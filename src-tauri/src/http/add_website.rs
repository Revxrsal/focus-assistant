use std::sync::atomic::Ordering;

use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use serde::Deserialize;
use tauri::{AppHandle, Manager};

use crate::focus::IS_FOCUSING;
use crate::http::ServerState;

#[derive(Deserialize)]
pub struct AddWebsite {
    website: String,
}

pub async fn add_website(
    State(state): State<ServerState>,
    Json(payload): Json<AddWebsite>,
) -> (StatusCode, Json<()>) {
    if IS_FOCUSING.load(Ordering::SeqCst) {
        return (StatusCode::ACCEPTED, Json(()));
    }
    state
        .app_handle
        .emit_all("websiteAddedThroughExtension", &payload.website)
        .unwrap();
    state.focus_options.write().allowed_websites_mut().push(payload.website);
    (StatusCode::ACCEPTED, Json(()))
}
