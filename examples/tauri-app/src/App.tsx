import React, { useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";
import {
  startWatch,
  onClipboardChange
} from "tauri-plugin-clipboard-next-api";
import { Box, Button, Stack } from "@mui/material";

const App: React.FC = () => {
  const cmdReadText = (async () => {
    const cmd_read_text = await invoke("read_text", {})
    console.log("cmd_read_text", cmd_read_text)
  })
  const readText = (async () => {
    const read_text = await invoke("plugin:clipboard-next|read_text", {})
    console.log("read_text", read_text)
  })
  const readHtml = (async () => {
    const read_html = await invoke("plugin:clipboard-next|read_html", {})
    console.log("read_html", read_html)
  })
  const readRtf = (async () => {
    const read_rtf = await invoke("plugin:clipboard-next|read_rtf", {})
    console.log("read_rtf", read_rtf)
  })
  const readImage = (async () => {
    const read_image = await invoke("plugin:clipboard-next|read_image", {})
    console.log("read_image", read_image)
  })
  const readFiles = (async () => {
    const read_files = await invoke("plugin:clipboard-next|read_files", {})
    console.log("read_files", read_files)
  })
  const writeText = (async () => {
    await invoke("plugin:clipboard-next|write_text", { content: "text: hello world!" })
  })
  const writeRtf = (async () => {
    await invoke("plugin:clipboard-next|write_rtf", { content: "rtf: hello world!" })
  })
  const writeHtml = (async () => {
    await invoke("plugin:clipboard-next|write_html", { content: "<h1>Hello, world!</h1>" })
  })
  const writeImage = (async () => {
    let image_path = "C:\\Users\\60746\\Pictures\\NSHM_PHOTO\\NSHM_PHOTO_2023_7_4_22_47_24.jpg";
    await invoke("plugin:clipboard-next|write_image", { imagePath: image_path })
    console.log("写入图片")
  })
  const writeFiles = (async () => {
    let files_path = ["C:\\Users\\60746\\Pictures\\NSHM_PHOTO\\NSHM_PHOTO_2023_7_4_22_47_24.jpg"];
    await invoke("plugin:clipboard-next|write_files", { filesPath: files_path })
  })

  useEffect(() => {
    (async () => {
      await startWatch()
      onClipboardChange((result) => {
        console.log("Clipboard changed: ", result);

        // const { text, image } = result;
        //
        // if (text) {
        //   console.log("text:", text.value);
        // }
        // if (image) {
        //   console.log("image:", image.value);
        // }
      });
    })()
  }, []);

  return (
    <Box>
      <Stack direction={"row"} spacing={2}>
        <Button variant={"contained"} onClick={cmdReadText}>
          cmd_read_text
        </Button>
        <Button variant={"contained"} onClick={readText}>
          读取剪切板文本
        </Button>
        <Button variant={"contained"} onClick={readRtf}>
          读取剪切板富文本
        </Button>
        <Button variant={"contained"} onClick={readHtml}>
          读取剪切板html
        </Button>
        <Button variant={"contained"} onClick={readImage}>
          读取剪切板图片
        </Button>
        <Button variant={"contained"} onClick={readFiles}>
          读取剪切板文件
        </Button>
      </Stack>
      <Stack direction={"row"} spacing={2} marginTop={2}>
        <Button variant={"contained"} onClick={writeText}>
          写入文本到剪切板
        </Button>
        <Button variant={"contained"} onClick={writeRtf}>
          写入富文本到剪切板
        </Button>
        <Button variant={"contained"} onClick={writeHtml}>
          写入html到剪切板
        </Button>
        <Button variant={"contained"} onClick={writeImage}>
          写入图片到剪切板
        </Button>
        <Button variant={"contained"} onClick={writeFiles}>
          写入文件到剪切板
        </Button>
      </Stack>
    </Box>
  );
};

export default App;