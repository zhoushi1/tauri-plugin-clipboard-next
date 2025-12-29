# tauri-plugin-clipboard-next

[![Crates.io](https://img.shields.io/crates/v/tauri-plugin-clipboard-next)](https://crates.io/crates/tauri-plugin-clipboard-next)
[![npm](https://img.shields.io/npm/v/tauri-plugin-clipboard-next-api)](https://www.npmjs.com/package/tauri-plugin-clipboard-next-api)
[![License](https://img.shields.io/github/license/zhoushi1/tauri-plugin-clipboard-next)](https://github.com/zhoushi1/tauri-plugin-clipboard-next/LICENSE)

Tauri 2 clipboard plugin: read/write/listen to clipboard (text/image/RTF/HTML/files) on Windows/macOS/Linux/iOS.

[English](./README.md) | [简体中文](./README.zh-CN.md)

## FEATURE SUPPORT

- Plain text
- Html
- Rich text
- Image (In `PNG` format)
- File (In `file-uri-list` format)
- Watch clipboard changes

## Platform Support

| Platform  | Supported |
|-----------|-----------|
| Windows   | ✅         |
| macOS     | ✅         |
| Linux     | ✅         |
| iOS(Beta) | ✅         |
| Android   | 🚧        |

## Install

```shell
cargo add tauri-plugin-clipboard-next
```

You can install the JavaScript Guest bindings using your preferred JavaScript package manager:

```shell
pnpm add tauri-plugin-clipboard-next-api
```

## Usage

`src-tauri/src/lib.rs`

```diff
pub fn run() {
    tauri::Builder::default()
+       .plugin(tauri_plugin_clipboard_next::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

`src-tauri/capabilities/default.json`

```diff
{
    ...
    "permissions": [
        ...
+       "clipboard-next:default"
    ]
}
```

Afterwards all the plugin's APIs are available through the JavaScript guest bindings:

```ts
import { startWatch, onClipboardChange } from 'tauri-plugin-clipboard-next-api';

await startWatch();

const unlisten = await onClipboardChange((clipboard) => {
  console.log('Clipboard changed:', clipboard);
});

// Later, to stop listening
unlisten();
```

## Methods

| Method              | Description                                      |
|---------------------|--------------------------------------------------|
| `startWatch`        | Start listening for clipboard changes            |
| `stopWatch`         | Stop listening for clipboard changes             |
| `hasText`           | Check if the clipboard contains plain text       |
| `hasRtf`            | Check if the clipboard contains rich text        |
| `hasHtml`           | Check if the clipboard contains html             |
| `hasImage`          | Check if the clipboard contains an image         |
| `hasFiles`          | Check if the clipboard contains files            |
| `readText`          | Read plain text from the clipboard               |
| `readRtf`           | Read rich text from the clipboard                |
| `readHtml`          | Read html from the clipboard                     |
| `readImage`         | Read image from the clipboard                    |
| `readFiles`         | Read file paths from the clipboard               |
| `writeText`         | Write plain text to the clipboard                |
| `writeRtf`          | Write rich text to the clipboard                 |
| `writeHtml`         | Write html content to the clipboard              |
| `writeImage`        | Write an image to the clipboard from a file path |
| `writeFiles`        | Write file paths to the clipboard                |
| `clear`             | Clear the clipboard contents                     |
| `getFilePath`       | Get the file path for clipboard operations       |
| `readClipboard`     | Read all available content from the clipboard    |
| `onClipboardChange` | Listen for clipboard changes                     |

## Example

```shell
git clone https://github.com/zhoushi1/tauri-plugin-clipboard-next.git
```

```shell
pnpm install

pnpm build

cd examples/tauri-app

pnpm install

pnpm tauri dev
```

## Thanks

- Special thanks to the [clipboard-rs](https://github.com/ChurchTao/clipboard-rs) crate, which provides reliable
  cross-platform clipboard operation capabilities for this Tauri 2 plugin (supporting text, image, rich text, HTML and
  files).