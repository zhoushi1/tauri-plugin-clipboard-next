use std::fs;
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Manager, Runtime};
use crate::constants;

/// Macro to generate singleton pattern for structs
///
/// Usage:
/// ```rust,ignore
/// use crate::utils::singleton::singleton;
///
/// struct MyStruct {
///     value: i32,
/// }
/// impl MyStruct {
///     fn new() -> Self {
///         MyStruct { value: 0 }
///     }
/// }
/// singleton!(MyStruct, INSTANCE);
/// ```
#[macro_export]
macro_rules! singleton {
    ($struct_name:ty, $instance_name:ident) => {
        static $instance_name: std::sync::OnceLock<$struct_name> = std::sync::OnceLock::new();

        impl $struct_name {
            pub fn global() -> &'static $struct_name {
                $instance_name.get_or_init(|| Self::new())
            }
        }
    };

    ($struct_name:ty, $instance_name:ident, $init_expr:expr) => {
        static $instance_name: std::sync::OnceLock<$struct_name> = std::sync::OnceLock::new();

        impl $struct_name {
            pub fn global() -> &'static $struct_name {
                $instance_name.get_or_init(|| $init_expr)
            }
        }
    };
}

/// Get file path
///
/// Resolves to [`data_dir`](tauri::path::PathResolver::data_dir)`/${bundle_identifier}/`[`plugin_name`](constants::plugin::NAME)`/`[`file_dir`](constants::plugin::FILE)
pub fn get_file_path<R: Runtime>(app_handle: AppHandle<R>) -> crate::Result<PathBuf> {
    let file_path = app_handle
        .path()
        .app_data_dir()
        .map_err(|err| err.to_string())?
        .join(constants::plugin::NAME)
        .join(constants::plugin::FILE);

    if !file_path.exists() {
        fs::create_dir_all(&file_path).map_err(|err| err.to_string())?;
    }

    Ok(file_path)
}

/// Get file size
pub fn get_file_size<P: AsRef<Path>>(path: P) -> crate::Result<u64> {
    let metadata = std::fs::metadata(path).map_err(|err| err.to_string())?;
    Ok(metadata.len())
}
