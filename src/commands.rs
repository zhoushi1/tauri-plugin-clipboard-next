use crate::models::*;
use crate::ClipboardNextExt;
use crate::Result;
use std::path::PathBuf;
use tauri::{command, AppHandle, Runtime};

/// Start listening for clipboard changes
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::start_watch;
/// await start_watch(app_handle)?;
/// ```
#[command]
pub(crate) async fn start_watch<R: Runtime>(app: AppHandle<R>) -> Result<()> {
    app.clipboard_next().start_watch(app.clone())
}

/// Stop listening for clipboard changes
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::stop_watch;
/// await stop_watch(app_handle)?;
/// ```
#[command]
pub(crate) async fn stop_watch<R: Runtime>(app: AppHandle<R>) -> Result<()> {
    app.clipboard_next().stop_watch()
}

/// Check if the clipboard contains plain text
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::has_text;
/// let has = has_text(app_handle).await?;
/// ```
#[command]
pub(crate) async fn has_text<R: Runtime>(app: AppHandle<R>) -> Result<bool> {
    app.clipboard_next().has_text()
}

/// Check if the clipboard contains rich text
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::has_rtf;
/// let has = has_rtf(app_handle).await?;
/// ```
#[command]
pub(crate) async fn has_rtf<R: Runtime>(app: AppHandle<R>) -> Result<bool> {
    app.clipboard_next().has_rtf()
}

/// Check if the clipboard contains html
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::has_html;
/// let has = has_html(app_handle).await?;
/// ```
#[command]
pub(crate) async fn has_html<R: Runtime>(app: AppHandle<R>) -> Result<bool> {
    app.clipboard_next().has_html()
}

/// Check if the clipboard contains an image
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::has_image;
/// let has = has_image(app_handle).await?;
/// ```
#[command]
pub(crate) async fn has_image<R: Runtime>(app: AppHandle<R>) -> Result<bool> {
    app.clipboard_next().has_image()
}

/// Check if the clipboard contains files
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::has_files;
/// let has = has_files(app_handle).await?;
/// ```
#[command]
pub(crate) async fn has_files<R: Runtime>(app: AppHandle<R>) -> Result<bool> {
    app.clipboard_next().has_files()
}

/// Read plain text from the clipboard
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::read_text;
/// let text = read_text(app_handle).await?;
/// ```
#[command]
pub(crate) async fn read_text<R: Runtime>(app: AppHandle<R>) -> Result<String> {
    app.clipboard_next().read_text()
}

/// Read rich text from the clipboard
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::read_rtf;
/// let rtf = read_rtf(app_handle).await?;
/// ```
#[command]
pub(crate) async fn read_rtf<R: Runtime>(app: AppHandle<R>) -> Result<String> {
    app.clipboard_next().read_rtf()
}

/// Read html from the clipboard
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::read_html;
/// let html = read_html(app_handle).await?;
/// ```
#[command]
pub(crate) async fn read_html<R: Runtime>(app: AppHandle<R>) -> Result<String> {
    app.clipboard_next().read_html()
}

/// Read image from the clipboard
///
/// # Arguments
/// * `save_path` - Optional path to save the image file
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::read_image;
/// let image = read_image(app_handle, Some(PathBuf::from("/path/to/save"))).await?;
/// ```
#[command]
pub(crate) async fn read_image<R: Runtime>(
    app: AppHandle<R>,
    save_path: Option<PathBuf>,
) -> Result<ReadImage> {
    app.clipboard_next().read_image(app.clone(), save_path)
}

/// Read file paths from the clipboard
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::read_files;
/// let files = read_files(app_handle).await?;
/// ```
#[command]
pub(crate) async fn read_files<R: Runtime>(app: AppHandle<R>) -> Result<ReadFiles> {
    app.clipboard_next().read_files()
}

/// Write plain text to the clipboard
///
/// # Arguments
/// * `content` - The text content to write
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::write_text;
/// write_text(app_handle, "Hello, World!".to_string()).await?;
/// ```
#[command]
pub(crate) async fn write_text<R: Runtime>(app: AppHandle<R>, content: String) -> Result<()> {
    app.clipboard_next().write_text(content)
}

/// Write rich text to the clipboard
///
/// # Arguments
/// * `content` - The RTF content to write
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::write_rtf;
/// write_rtf(app_handle, "\x1b[1m\x1b[4m\x1b[31mHello, World!\x1b[0m".to_string()).await?;
/// ```
#[command]
pub(crate) async fn write_rtf<R: Runtime>(app: AppHandle<R>, content: String) -> Result<()> {
    app.clipboard_next().write_rtf(content)
}

/// Write html to the clipboard
///
/// # Arguments
/// * `content` - The HTML content to write
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::write_html;
/// write_html(app_handle, "<p>Hello</p>".to_string()).await?;
/// ```
#[command]
pub(crate) async fn write_html<R: Runtime>(app: AppHandle<R>, content: String) -> Result<()> {
    app.clipboard_next().write_html(content)
}

/// Write an image to the clipboard from a file path
///
/// # Arguments
/// * `image_path` - Path to the image file
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::write_image;
/// write_image(app_handle, "/path/to/image.png".to_string()).await?;
/// ```
#[command]
pub(crate) async fn write_image<R: Runtime>(app: AppHandle<R>, image_path: String) -> Result<()> {
    app.clipboard_next().write_image(image_path)
}

/// Write file paths to the clipboard
///
/// # Arguments
/// * `files_path` - file paths
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::write_files;
/// write_files(app_handle, vec!["/path/to/file1.txt".to_string()]).await?;
/// ```
#[command]
pub(crate) async fn write_files<R: Runtime>(
    app: AppHandle<R>,
    files_path: Vec<String>,
) -> Result<()> {
    app.clipboard_next().write_files(files_path)
}

/// Clear the clipboard contents
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::clear;
/// clear(app_handle).await?;
/// ```
#[command]
pub(crate) async fn clear<R: Runtime>(app: AppHandle<R>) -> Result<()> {
    app.clipboard_next().clear()
}

/// Get the file path for clipboard operations
///
/// Resolves to [`data_dir`](tauri::path::PathResolver::data_dir)`/${bundle_identifier}/`[`plugin_name`](constants::plugin::NAME)`/`[`file_dir`](constants::plugin::FILE)
///
/// # Example
/// ```
/// use tauri_plugin_clipboard_next::get_file_path;
/// let path = get_file_path(app_handle).await?;
/// ```
#[command]
pub(crate) async fn get_file_path<R: Runtime>(app: AppHandle<R>) -> Result<PathBuf> {
    app.clipboard_next().get_file_path(app.clone())
}
