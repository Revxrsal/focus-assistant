use std::net::SocketAddr;
use std::sync::Arc;
use std::sync::atomic::Ordering;

use axum::extract::State;
use axum::http::StatusCode;
use axum::routing::post;
use axum::{Json, Router};
use serde::{Deserialize, Serialize};
use tokio::sync::Mutex;

use crate::IS_FOCUSING;
use crate::app::FocusOptions;

pub async fn start_http_server(options: Arc<Mutex<FocusOptions>>) {
    let app = Router::new()
        .route("/canAccess", post(access_website))
        .with_state(options);

    let addr = SocketAddr::from(([127, 0, 0, 1], 4455));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn access_website(
    State(options): State<Arc<Mutex<FocusOptions>>>,
    Json(payload): Json<CanAccessWebsite>,
) -> (StatusCode, Json<CanAccessWebsiteResp>) {
    if !IS_FOCUSING.load(Ordering::SeqCst) {
        return (StatusCode::ACCEPTED, Json(CanAccessWebsiteResp { can_access: true }));
    }
    let can_access = options
        .lock()
        .await
        .allowed_websites()
        .iter()
        .any(|v| payload.website.to_lowercase().contains(&v.to_lowercase()));
    let response = CanAccessWebsiteResp { can_access };
    (StatusCode::ACCEPTED, Json(response))
}

#[derive(Deserialize)]
struct CanAccessWebsite {
    website: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CanAccessWebsiteResp {
    can_access: bool,
}
