/// plugin constants
pub mod plugin {
    /// plugin name
    pub const NAME: &str = "tauri-plugin-clipboard-next";
    
    /// plugin file
    pub const FILE: &str = "file";
}

pub mod event {
    pub const CLIPBOARD_CHANGE: &str = "plugin:clipboard-next://clipboard_change";
}