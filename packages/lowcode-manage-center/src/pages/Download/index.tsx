import { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { parse, serialize } from "parse5";
import jsZip from "jszip";
import { saveAs } from 'file-saver';
import { findNodeById } from "../../utils/node";
import PageNav from "../../components/PageNav";
import styles from "./index.module.less";

export default function About() {
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    setCurrentId("12345678");
  }, []);

  const dowloadFilesZip = async () => {
    const htmlContent = await axios
      .get("http://localhost:5557/activity.html")
      .then((res) => {
        const doc = parse(res.data);
        // @ts-expect-error parse type error
        const scriptNode = findNodeById(doc, "inject-script-base");
        if (scriptNode) {
          // @ts-expect-error parse type error
          scriptNode.childNodes[0].value = `${scriptNode.childNodes[0].value};\nconsole.log(123);\n`;
        }
        const newTpl = serialize(doc);
        // console.log(res.data);
        return newTpl;
      });

    const jsContent = await axios
      .get("http://localhost:5557/js/activity.js")
      .then((res) => {
        // console.log(res.data);
        return res.data;
      });

    const cssContent = await axios
      .get("http://localhost:5557/css/activity.css")
      .then((res) => {
        // console.log(res.data);
        return res.data;
      });

    const zipX = new jsZip();
    console.log(zipX, jsZip.support);

    zipX.file("js/activity.js", jsContent);
    zipX.file("css/activity.css", cssContent);
    zipX.file("index.html", htmlContent);

    const blob = await zipX.generateAsync({ type: "blob" });

    saveAs(blob, 'assets.zip')


    // console.log("download", htmlContent, jsContent, cssContent);
  };

  return (
    <>
      <PageNav></PageNav>
      <div className={styles["download-container"]}>
        <div>Download Page, Current id: {currentId}</div>
        <Button type="primary" onClick={dowloadFilesZip}>
          下载
        </Button>
      </div>
    </>
  );
}
