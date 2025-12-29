import React from 'react';
import { invoke } from "@tauri-apps/api/core";
import { Box, Button, Stack } from "@mui/material";

const App: React.FC = () => {
  const cmd_read_text = (async () => {
    const cmd_read_text = await invoke("read_text", {})
    console.log("cmd_read_text", cmd_read_text)
  })
  const read_text = (async () => {
    const read_text = await invoke("plugin:clipboard-next|read_text", {})
    console.log("read_text", read_text)
  })
  const read_html = (async () => {
    const read_html = await invoke("plugin:clipboard-next|read_html", {})
    console.log("read_html", read_html)
  })
  const read_rtf = (async () => {
    const read_rtf = await invoke("plugin:clipboard-next|read_rtf", {})
    console.log("read_rtf", read_rtf)
  })
  const read_image = (async () => {
    const read_image = await invoke("plugin:clipboard-next|read_image", {})
    console.log("read_image", read_image)
  })
  const read_files = (async () => {
    const read_files = await invoke("plugin:clipboard-next|read_files", {})
    console.log("read_files", read_files)
  })
  const write_text = (async () => {
    await invoke("plugin:clipboard-next|write_text", {content: "text: hello world!"})
  })
  const write_rtf = (async () => {
    await invoke("plugin:clipboard-next|write_rtf", {content: "rtf: hello world!"})
  })
  const write_html = (async () => {
    await invoke("plugin:clipboard-next|write_html", {content: "<h1>Hello, world!</h1>"})
  })
  const write_image = (async () => {
    let image_path = "C:\\Users\\60746\\Pictures\\NSHM_PHOTO\\NSHM_PHOTO_2023_7_4_22_47_24.jpg";
    await invoke("plugin:clipboard-next|write_image", {imagePath: image_path})
    console.log("写入图片")
  })
  const write_files = (async () => {
    let files_path = ["C:\\Users\\60746\\Pictures\\NSHM_PHOTO\\NSHM_PHOTO_2023_7_4_22_47_24.jpg"];
    await invoke("plugin:clipboard-next|write_files", {filesPath: files_path})
  })

  return (
    <Box>
      <Stack direction={"row"} spacing={2}>
        <Button variant={"contained"} onClick={cmd_read_text}>
          cmd_read_text
        </Button>
        <Button variant={"contained"} onClick={read_text}>
          读取剪切板文本
        </Button>
        <Button variant={"contained"} onClick={read_rtf}>
          读取剪切板富文本
        </Button>
        <Button variant={"contained"} onClick={read_html}>
          读取剪切板html
        </Button>
        <Button variant={"contained"} onClick={read_image}>
          读取剪切板图片
        </Button>
        <Button variant={"contained"} onClick={read_files}>
          读取剪切板文件
        </Button>
      </Stack>
      <Stack direction={"row"} spacing={2} marginTop={2}>
        <Button variant={"contained"} onClick={write_text}>
          写入文本到剪切板
        </Button>
        <Button variant={"contained"} onClick={write_rtf}>
          写入富文本到剪切板
        </Button>
        <Button variant={"contained"} onClick={write_html}>
          写入html到剪切板
        </Button>
        <Button variant={"contained"} onClick={write_image}>
          写入图片到剪切板
        </Button>
        <Button variant={"contained"} onClick={write_files}>
          写入文件到剪切板
        </Button>
      </Stack>
    </Box>
  );
};

export default App;