use crate::Result;
use tauri::AppHandle;
use tauri_plugin_clipboard_next::ClipboardNextExt;

#[tauri::command]
pub async fn read_text(app_handle: AppHandle) -> Result<String> {
    app_handle.clipboard_next().read_text()
}
