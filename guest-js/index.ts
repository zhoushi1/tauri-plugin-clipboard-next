import { invoke } from '@tauri-apps/api/core'
import { listen } from "@tauri-apps/api/event";

const buildCmd = (cmd: string) => `plugin:clipboard-next|${cmd}`
const buildEventUrl = (event: string) => `plugin:clipboard-next://${event}`

export const COMMANDS = {
  START_WATCH: buildCmd("start_watch"),
  STOP_WATCH: buildCmd("stop_watch"),
  HAS_TEXT: buildCmd("has_text"),
  HAS_RTF: buildCmd("has_rtf"),
  HAS_HTML: buildCmd("has_html"),
  HAS_IMAGE: buildCmd("has_image"),
  HAS_FILES: buildCmd("has_files"),
  READ_TEXT: buildCmd("read_text"),
  READ_RTF: buildCmd("read_rtf"),
  READ_HTML: buildCmd("read_html"),
  READ_IMAGE: buildCmd("read_image"),
  READ_FILES: buildCmd("read_files"),
  WRITE_TEXT: buildCmd("write_text"),
  WRITE_RTF: buildCmd("write_rtf"),
  WRITE_HTML: buildCmd("write_html"),
  WRITE_IMAGE: buildCmd("write_image"),
  WRITE_FILES: buildCmd("write_files"),
  CLEAR: buildCmd("clear"),
  GET_FILE_PATH: buildCmd("get_file_path")
}

export const EVENTS = {
  CLIPBOARD_CHANGE: buildEventUrl("clipboard_change"),
}

export interface ReadImage {
  /**
   * @descCN 图像的路径
   * @descEN The path of the image
   */
  path: string;
  /**
   * @descCN 图像的宽度
   * @descEN The width of the image
   */
  width: number;
  /**
   * @descCN 图像的高度
   * @descEN The height of the image
   */
  height: number;
  /**
   * @descCN 图像的大小，以字节为单位
   * @descEN The size of the image in bytes
   */
  size: number;
}

export interface FileItem {
  /**
   * @descCN 文件的路径
   * @descEN The path of the file
   */
  path: string;
  /**
   * @descCN 文件的大小，以字节为单位
   * @descEN The size of the file in bytes
   */
  size: number;
}

export interface ReadFiles {
  /**
   * @descCN 文件的路径
   * @descEN The paths of the files
   */
  files: FileItem[];
  /**
   * @descCN 所有文件的大小，以字节为单位
   * @descEN The size of the files in bytes
   */
  size: number;
}

export type ClipboardContentFormat = "text" | "rtf" | "html" | "image" | "files";

type ClipboardContentValue<T extends ClipboardContentFormat> =
  T extends "image" ? ReadImage :
  T extends "files" ? ReadFiles :
  string;

export type ClipboardContent<T extends ClipboardContentFormat = ClipboardContentFormat> = {
  /**
   * @descCN 内容的格式
   * @descEN The format of the content
   */
  format: T;

  /**
   * @descCN 内容的值
   * @descEN The value of the content
   */
  value: ClipboardContentValue<T>;
}

export type ReadClipboard = Partial<{ [K in ClipboardContentFormat]: ClipboardContent<K> }>;

export type ClipboardChangeCallback = (readClipboard: ReadClipboard) => void;

export interface ClipboardChangeOptions {
  /**
   * default value: `false`
   * @descCN 自动保存图片到`filePath`
   * @descEN auto save images to `filePath`
   */
  imageAutoSave?: boolean;
  /**
   * @descCN 保存文件和图片的可选路径，如果未提供则使用默认路径，使用`getFilePath()`获取默认路径位置
   * @descEN Optional path to save the file and image, if not provided, the default path will be used, use `getFilePath()` to get the default path
   */
  filePath?: string;
  /**
   * @descCN 读取剪贴板之前运行的钩子函数
   * @descEN A hook function that runs before reading the clipboard
   */
  before?: () => void;
}

/**
 * Start listening for clipboard changes
 *
 * @example
 * ```
 * import { startWatch } from 'tauri-plugin-clipboard-next-api';
 *
 * await startWatch();
 * ```
 */
export const startWatch = () => {
  return invoke<void>(COMMANDS.START_WATCH)
}

/**
 * Stop listening for clipboard changes
 *
 * @example
 * ```
 * import { stopWatch } from 'tauri-plugin-clipboard-next-api';
 *
 * await stopWatch();
 * ```
 */
export const stopWatch = () => {
  return invoke<void>(COMMANDS.STOP_WATCH)
}

/**
 * Check if the clipboard contains plain text
 *
 * @example
 * ```
 * import { hasText } from 'tauri-plugin-clipboard-next-api';
 *
 * const has = await hasText();
 * ```
 */
export const hasText = () => {
  return invoke<boolean>(COMMANDS.HAS_TEXT)
}

/**
 * Check if the clipboard contains rich text
 *
 * @example
 * ```
 * import { hasRtf } from 'tauri-plugin-clipboard-next-api';
 *
 * const has = await hasRtf();
 * ```
 */
export const hasRtf = () => {
  return invoke<boolean>(COMMANDS.HAS_RTF)
}

/**
 * Check if the clipboard contains html
 *
 * @example
 * ```
 * import { hasHtml } from 'tauri-plugin-clipboard-next-api';
 *
 * const has = await hasHtml();
 * ```
 */
export const hasHtml = () => {
  return invoke<boolean>(COMMANDS.HAS_HTML)
}

/**
 * Check if the clipboard contains an image
 *
 * @example
 * ```
 * import { hasImage } from 'tauri-plugin-clipboard-next-api';
 *
 * const has = await hasImage();
 * ```
 */
export const hasImage = () => {
  return invoke<boolean>(COMMANDS.HAS_IMAGE)
}

/**
 * Check if the clipboard contains files
 *
 * @example
 * ```
 * import { hasFiles } from 'tauri-plugin-clipboard-next-api';
 *
 * const has = await hasFiles();
 * ```
 */
export const hasFiles = () => {
  return invoke<boolean>(COMMANDS.HAS_FILES)
}

/**
 * Read plain text from the clipboard
 *
 * @example
 * ```
 * import { readText } from 'tauri-plugin-clipboard-next-api';
 *
 * const text = await readText();
 * ```
 */
export const readText = () => {
  return invoke<string>(COMMANDS.READ_TEXT)
}

/**
 * Read rich text from the clipboard
 *
 * @example
 * ```
 * import { readRtf } from 'tauri-plugin-clipboard-next-api';
 *
 * const rtf = await readRtf();
 * ```
 */
export const readRtf = () => {
  return invoke<string>(COMMANDS.READ_RTF)
}

/**
 * Read html from the clipboard
 *
 * @example
 * ```
 * import { readHtml } from 'tauri-plugin-clipboard-next-api';
 *
 * const html = await readHtml();
 * ```
 */
export const readHtml = () => {
  return invoke<string>(COMMANDS.READ_HTML)
}

/**
 * Read image from the clipboard
 *
 * @param savePath - Optional path to save the image file
 *
 * @example
 * ```
 * import { readImage } from 'tauri-plugin-clipboard-next-api';
 *
 * const image = await readImage('/path/to/save');
 * ```
 */
export const readImage = (savePath?: string) => {
  return invoke<ReadImage>(COMMANDS.READ_IMAGE, { savePath })
}

/**
 * Read file paths from the clipboard
 *
 * @example
 * ```
 * import { readFiles } from 'tauri-plugin-clipboard-next-api';
 *
 * const files = await readFiles();
 * ```
 */
export const readFiles = () => {
  return invoke<ReadFiles>(COMMANDS.READ_FILES)
}

/**
 * Write plain text to the clipboard
 *
 * @param content - The text content to write
 *
 * @example
 * ```
 * import { writeText } from 'tauri-plugin-clipboard-next-api';
 *
 * await writeText('Hello, World!');
 * ```
 */
export const writeText = (content: string) => {
  return invoke<void>(COMMANDS.WRITE_TEXT, { content })
}

/**
 * Write rich text to the clipboard
 *
 * @param content - The RTF content to write
 *
 * @example
 * ```
 * import { writeRtf } from 'tauri-plugin-clipboard-next-api';
 *
 * await writeRtf("\x1b[1m\x1b[4m\x1b[31mHello, World!\x1b[0m");
 * ```
 */
export const writeRtf = (content: string) => {
  return invoke<void>(COMMANDS.WRITE_RTF, { content })
}

/**
 * Write html content to the clipboard
 *
 * @param content - The HTML content to write
 *
 * @example
 * ```
 * import { writeHtml } from 'tauri-plugin-clipboard-next-api';
 *
 * await writeHtml('<p>Hello</p>');
 * ```
 */
export const writeHtml = (content: string) => {
  return invoke<void>(COMMANDS.WRITE_HTML, { content })
}

/**
 * Write an image to the clipboard from a file path
 *
 * @param imagePath - Path to the image file
 *
 * @example
 * ```
 * import { writeImage } from 'tauri-plugin-clipboard-next-api';
 *
 * await writeImage('/path/to/image.png');
 * ```
 */
export const writeImage = (imagePath: string) => {
  return invoke<void>(COMMANDS.WRITE_IMAGE, { imagePath })
}

/**
 * Write file paths to the clipboard
 *
 * @param filesPath - Array of file paths to write
 *
 * @example
 * ```
 * import { writeFiles } from 'tauri-plugin-clipboard-next-api';
 *
 * await writeFiles(['/path/to/file1.txt', '/path/to/file2.txt']);
 * ```
 */
export const writeFiles = (filesPath: string[]) => {
  return invoke<void>(COMMANDS.WRITE_FILES, { filesPath })
}

/**
 * Clear the clipboard contents
 *
 * @example
 * ```
 * import { clear } from 'tauri-plugin-clipboard-next-api';
 *
 * await clear();
 * ```
 */
export const clear = () => {
  return invoke<void>(COMMANDS.CLEAR)
}

/**
 * Get the file path for clipboard operations
 *
 * @example
 * ```
 * import { getFilePath } from 'tauri-plugin-clipboard-next-api';
 *
 * const path = await getFilePath();
 * ```
 */
export const getFilePath = () => {
  return invoke<string>(COMMANDS.GET_FILE_PATH)
}

/**
 * Read all available content from the clipboard
 *
 * @returns An object containing all available clipboard formats and their content
 *
 * @example
 * ```
 * import { readClipboard } from 'tauri-plugin-clipboard-next-api';
 *
 * const clipboard = await readClipboard();
 * if (clipboard.text) {
 *   console.log(clipboard.text.value);
 * }
 * ```
 */
export const readClipboard = async (imageAutoSave?: boolean, filePath?: string) => {
  const readClipboard: ReadClipboard = {};

  if (await hasText()) {
    const content = await readText();
    readClipboard.text = {
      format: "text",
      value: content
    }
  }

  if (await hasRtf()) {
    const content = await readRtf();
    readClipboard.rtf = {
      format: "rtf",
      value: content
    }
  }

  if (await hasHtml()) {
    const content = await readHtml();
    readClipboard.html = {
      format: "html",
      value: content
    }
  }

  if (imageAutoSave && await hasImage()) {
    const content = await readImage(filePath);
    readClipboard.image = {
      format: "image",
      value: content
    }
  }

  if (await hasFiles()) {
    const content = await readFiles();
    readClipboard.files = {
      format: "files",
      value: content
    }
  }

  return readClipboard;
}

/**
 * Listen for clipboard changes
 *
 * @param cb - Callback function to be called when clipboard changes
 * @param options - Optional configuration for the listener
 *
 * @example
 * ```
 * import { startWatch, onClipboardChange } from 'tauri-plugin-clipboard-next-api';
 *
 * await startWatch();
 *
 * const unlisten = await onClipboardChange((clipboard) => {
 *   console.log('Clipboard changed:', clipboard);
 * });
 *
 * // Later, to stop listening
 * unlisten();
 * ```
 */
export const onClipboardChange = (cb: ClipboardChangeCallback, options?: ClipboardChangeOptions) => {
  const { before, imageAutoSave = false, filePath } = options || {}

  return listen(EVENTS.CLIPBOARD_CHANGE, async () => {
    before?.();

    const read = await readClipboard(imageAutoSave, filePath);
    cb(read);
  })
}