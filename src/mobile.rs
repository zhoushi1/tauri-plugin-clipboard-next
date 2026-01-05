use clipboard_rs::common::RustImage;
use clipboard_rs::{
    Clipboard, ClipboardContent, ClipboardContext, ClipboardHandler, ClipboardWatcher,
    ClipboardWatcherContext, ContentFormat, RustImageData, WatcherShutdown,
};
use parking_lot::Mutex;
use serde::de::DeserializeOwned;
use std::fs;
use std::hash::{DefaultHasher, Hash, Hasher};
use std::path::PathBuf;
use std::sync::Arc;
use std::thread::spawn;
use tauri::{
    plugin::{PluginApi, PluginHandle},
    AppHandle, Emitter, Runtime,
};

use crate::models::*;
use crate::Result;
use crate::{constants, singleton, utils};

#[cfg(target_os = "ios")]
tauri::ios_plugin_binding!(init_plugin_clipboard_next);

// ClipboardNextManager singleton
singleton!(ClipboardNextManager, CLIPBOARD_NEXT_MANAGER);

pub(crate) struct ClipboardNextManager {
    ctx: Arc<Mutex<ClipboardContext>>,
    watcher_shutdown: Arc<Mutex<Option<WatcherShutdown>>>,
}

pub(crate) struct ClipboardNextHandler<R>
where
    R: Runtime,
{
    app_handle: AppHandle<R>,
}

impl ClipboardNextManager {
    pub fn new() -> Self {
        Self {
            ctx: Arc::new(Mutex::new(ClipboardContext::new().unwrap())),
            watcher_shutdown: Arc::default(),
        }
    }

    pub fn has(&self, format: ContentFormat) -> Result<bool> {
        Ok(self.ctx.lock().has(format))
    }

    pub fn get(&self, formats: &[ContentFormat]) -> Result<Vec<ClipboardContent>> {
        self.ctx.lock().get(formats).map_err(|err| err.to_string())
    }

    pub fn set(&self, contents: Vec<ClipboardContent>) -> Result<()> {
        self.ctx.lock().set(contents).map_err(|err| err.to_string())
    }

    pub fn clear(&self) -> Result<()> {
        self.ctx.lock().clear().map_err(|err| err.to_string())
    }
}

impl<R> ClipboardNextHandler<R>
where
    R: Runtime,
{
    pub fn new(app_handle: AppHandle) -> Self {
        Self { app_handle }
    }
}

impl<R> ClipboardHandler for ClipboardNextHandler<R>
where
    R: Runtime,
{
    fn on_clipboard_change(&mut self) {
        let _ = self
            .app_handle
            .emit(constants::event::CLIPBOARD_CHANGE, ())
            .map_err(|err| err.to_string());
    }
}

// initializes the Kotlin or Swift plugin classes
pub fn init<R: Runtime, C: DeserializeOwned>(
    _app: &AppHandle<R>,
    api: PluginApi<R, C>,
) -> Result<ClipboardNext<R>> {
    #[cfg(target_os = "android")]
    let handle = api
        .register_android_plugin("", "ExamplePlugin")
        .map_err(|err| err.to_string())?;

    #[cfg(target_os = "ios")]
    let handle = api
        .register_ios_plugin(init_plugin_clipboard_next)
        .map_err(|err| err.to_string())?;

    Ok(ClipboardNext(handle))
}

/// Access to the clipboard-next APIs.
pub struct ClipboardNext<R: Runtime>(PluginHandle<R>);

impl<R: Runtime> ClipboardNext<R> {
    pub fn start_watch(&self, app_handle: AppHandle<R>) -> Result<()> {
        let clipboard_next_handler = ClipboardNextHandler::new(app_handle);

        let mut watcher = ClipboardWatcherContext::new().unwrap();

        let watcher_shutdown = watcher
            .add_handler(clipboard_next_handler)
            .get_shutdown_channel();

        let mut watcher_shutdown_state = ClipboardNextManager::global().watcher_shutdown.lock();
        *watcher_shutdown_state = Some(watcher_shutdown);

        spawn(move || {
            watcher.start_watch();
        });

        Ok(())
    }

    pub fn stop_watch(&self) -> Result<()> {
        let mut watcher_shutdown_state = ClipboardNextManager::global().watcher_shutdown.lock();

        if let Some(watcher_shutdown) = watcher_shutdown_state.take() {
            watcher_shutdown.stop();
        }

        *watcher_shutdown_state = None;

        Ok(())
    }

    pub fn has_text(&self) -> Result<bool> {
        ClipboardNextManager::global().has(ContentFormat::Text)
    }

    pub fn has_rtf(&self) -> Result<bool> {
        ClipboardNextManager::global().has(ContentFormat::Rtf)
    }

    pub fn has_html(&self) -> Result<bool> {
        ClipboardNextManager::global().has(ContentFormat::Html)
    }

    pub fn has_image(&self) -> Result<bool> {
        ClipboardNextManager::global().has(ContentFormat::Image)
    }

    pub fn has_files(&self) -> Result<bool> {
        ClipboardNextManager::global().has(ContentFormat::Files)
    }

    pub fn read_text(&self) -> Result<String> {
        ClipboardNextManager::global()
            .ctx
            .lock()
            .get_text()
            .map_err(|err| err.to_string())
    }

    pub fn read_rtf(&self) -> Result<String> {
        ClipboardNextManager::global()
            .ctx
            .lock()
            .get_rich_text()
            .map_err(|err| err.to_string())
    }

    pub fn read_html(&self) -> Result<String> {
        ClipboardNextManager::global()
            .ctx
            .lock()
            .get_html()
            .map_err(|err| err.to_string())
    }

    pub fn read_image(
        &self,
        app_handle: AppHandle<R>,
        save_path: Option<PathBuf>,
    ) -> Result<ReadImage> {
        let file_path = match save_path {
            None => self.get_file_path(app_handle)?,
            Some(path) => path,
        };

        if !file_path.exists() {
            fs::create_dir_all(&file_path).map_err(|err| err.to_string())?;
        }

        let image = ClipboardNextManager::global()
            .ctx
            .lock()
            .get_image()
            .map_err(|err| err.to_string())?;

        let (width, height) = image.get_size();

        let dynamic_image = image.get_dynamic_image().map_err(|err| err.to_string())?;

        let bytes = dynamic_image.as_bytes();

        let mut hasher = DefaultHasher::new();

        bytes.hash(&mut hasher);

        let hash = hasher.finish();

        let full_file_path = file_path.join(format!("{}.png", hash));

        if !full_file_path.exists() {
            match full_file_path.to_str() {
                None => {
                    return Err("Invalid path".to_string());
                }
                Some(path_str) => {
                    image
                        .save_to_path(path_str)
                        .map_err(|err| err.to_string())?;
                }
            }
        }

        let file_size = utils::get_file_size(&full_file_path).unwrap_or(0);

        Ok(ReadImage {
            path: full_file_path,
            width,
            height,
            size: file_size,
        })
    }

    pub fn read_files(&self) -> Result<ReadFiles> {
        let files = ClipboardNextManager::global()
            .ctx
            .lock()
            .get_files()
            .map_err(|err| err.to_string())?;

        let size = files
            .iter()
            .map(|file| utils::get_file_size(file).unwrap_or(0))
            .sum();

        Ok(ReadFiles { paths: files, size })
    }

    pub fn write_text(&self, content: String) -> Result<()> {
        ClipboardNextManager::global().set(vec![ClipboardContent::Text(content)])
    }
    pub fn write_rtf(&self, content: String) -> Result<()> {
        ClipboardNextManager::global().set(vec![
            ClipboardContent::Rtf(content.clone()),
            ClipboardContent::Text(content),
        ])
    }

    pub fn write_html(&self, content: String) -> Result<()> {
        ClipboardNextManager::global().set(vec![
            ClipboardContent::Html(content.clone()),
            ClipboardContent::Text(content),
        ])
    }

    pub fn write_image(&self, image_path: String) -> Result<()> {
        let image_data = RustImageData::from_path(&image_path).map_err(|err| err.to_string())?;
        ClipboardNextManager::global().set(vec![ClipboardContent::Image(image_data)])
    }

    pub fn write_files(&self, files_path: Vec<String>) -> Result<()> {
        ClipboardNextManager::global().set(vec![ClipboardContent::Files(files_path)])
    }

    pub fn clear(&self) -> Result<()> {
        ClipboardNextManager::global().clear()
    }

    pub fn get_file_path(&self, app_handle: AppHandle<R>) -> Result<PathBuf> {
        utils::get_file_path(app_handle)
    }
}
