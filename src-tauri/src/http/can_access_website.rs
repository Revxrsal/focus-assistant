use std::sync::Arc;
use std::sync::atomic::Ordering;
use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use parking_lot::RwLock;
use serde::{Deserialize, Serialize};
use crate::focus::{FocusStore, IS_FOCUSING};
use crate::http::ServerState;

#[derive(Deserialize)]
pub struct CanAccessWebsite {
    website: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CanAccessWebsiteResp {
    can_access: bool,
}

pub async fn can_access_website(
    State(state): State<ServerState>,
    Json(payload): Json<CanAccessWebsite>,
) -> (StatusCode, Json<CanAccessWebsiteResp>) {
    if !IS_FOCUSING.load(Ordering::SeqCst) {
        return (StatusCode::ACCEPTED, Json(CanAccessWebsiteResp { can_access: true }));
    }
    let can_access = state.focus_options.read()
        .allowed_websites()
        .iter()
        .any(|v| payload.website.to_lowercase().contains(&v.to_lowercase()));
    let response = CanAccessWebsiteResp { can_access };
    (StatusCode::ACCEPTED, Json(response))
}
