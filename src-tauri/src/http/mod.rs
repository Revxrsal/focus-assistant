use std::net::SocketAddr;
use std::sync::Arc;

use axum::Router;
use axum::routing::post;
use parking_lot::RwLock;

use crate::focus::FocusStore;
use crate::http::add_website::add_website;
use crate::http::can_access_website::can_access_website;

mod can_access_website;
mod add_website;

pub async fn start_http_server(options: Arc<RwLock<FocusStore>>) {
    let app = Router::new()
        .route("/canAccessWebsite", post(can_access_website))
        .route("/addWebsite", post(add_website))
        .with_state(options);

    let addr = SocketAddr::from(([127, 0, 0, 1], 4455));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
