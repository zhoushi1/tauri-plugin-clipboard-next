# tauri-plugin-clipboard-next

[![Crates.io](https://img.shields.io/crates/v/tauri-plugin-clipboard-next)](https://crates.io/crates/tauri-plugin-clipboard-next)
[![npm](https://img.shields.io/npm/v/tauri-plugin-clipboard-next-api)](https://www.npmjs.com/package/tauri-plugin-clipboard-next-api)
[![License](https://img.shields.io/github/license/zhoushi1/tauri-plugin-clipboard-next)](https://github.com/zhoushi1/tauri-plugin-clipboard-next/LICENSE)

Tauri 2 剪贴板插件：在 Windows/macOS/Linux/iOS 上读取/写入/监听剪贴板（纯文本/富文本/HTML/图片/文件）。

[English](./README.md) | [简体中文](./README.zh-CN.md)

## 功能支持

- 纯文本
- Html
- 富文本
- 图片（`PNG` 格式）
- 文件（`file-uri-list` 格式）
- 监听剪贴板变化

## 平台支持

| 平台       | 支持情况 |
|----------|------|
| Windows  | ✅    |
| macOS    | ✅    |
| Linux    | ✅    |
| iOS(测试版) | ✅    |
| Android  | 🚧   |

## 安装

```shell
cargo add tauri-plugin-clipboard-next
```

您可以使用您喜欢的 JavaScript 包管理器安装 JavaScript Guest 绑定：

```shell
pnpm add tauri-plugin-clipboard-next-api
```

## 使用方法

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

之后，所有插件的 API 都可以通过 JavaScript guest 绑定使用：

```ts
import { startWatch, onClipboardChange } from 'tauri-plugin-clipboard-next-api';

await startWatch();

const unlisten = await onClipboardChange((clipboard) => {
  console.log('Clipboard changed:', clipboard);
});

// 稍后，停止监听
unlisten();
```

## 方法

| 方法                  | 描述                                               |
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

## 示例

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

## 致谢

- 特别感谢 [clipboard-rs](https://github.com/ChurchTao/clipboard-rs) crate，它为这个 Tauri 2
  插件提供了可靠的跨平台剪贴板操作能力（支持纯文本、富文本、HTML、图片和文件）。
