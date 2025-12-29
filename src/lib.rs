use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;
mod utils;
mod constants;

pub use error::*;

#[cfg(desktop)]
use desktop::ClipboardNext;
#[cfg(mobile)]
use mobile::ClipboardNext;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the clipboard-next APIs.
pub trait ClipboardNextExt<R: Runtime> {
    fn clipboard_next(&self) -> &ClipboardNext<R>;
}

impl<R: Runtime, T: Manager<R>> ClipboardNextExt<R> for T {
    fn clipboard_next(&self) -> &ClipboardNext<R> {
        self.state::<ClipboardNext<R>>().inner()
    }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("clipboard-next")
        .invoke_handler(tauri::generate_handler![
            commands::start_watch,
            commands::stop_watch,
            commands::has_text,
            commands::has_rtf,
            commands::has_html,
            commands::has_image,
            commands::has_files,
            commands::read_text,
            commands::read_rtf,
            commands::read_html,
            commands::read_image,
            commands::read_files,
            commands::write_text,
            commands::write_rtf,
            commands::write_html,
            commands::write_image,
            commands::write_files,
            commands::clear,
            commands::get_file_path,
        ])
        .setup(|app, api| {
            #[cfg(mobile)]
            let clipboard_next = mobile::init(app, api)?;

            #[cfg(desktop)]
            let clipboard_next = desktop::init(app, api)?;

            app.manage(clipboard_next);
            Ok(())
        })
        .build()
}
