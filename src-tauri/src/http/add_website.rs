use std::sync::Arc;
use std::sync::atomic::Ordering;

use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use parking_lot::RwLock;
use serde::Deserialize;

use crate::focus::{FocusStore, IS_FOCUSING};

#[derive(Deserialize)]
pub struct AddWebsite {
    website: String,
}

pub async fn add_website(
    State(options): State<Arc<RwLock<FocusStore>>>,
    Json(payload): Json<AddWebsite>,
) -> (StatusCode, Json<()>) {
    if IS_FOCUSING.load(Ordering::SeqCst) {
        return (StatusCode::ACCEPTED, Json(()));
    }
    options.write().allowed_websites_mut().push(payload.website);
    (StatusCode::ACCEPTED, Json(()))
}
