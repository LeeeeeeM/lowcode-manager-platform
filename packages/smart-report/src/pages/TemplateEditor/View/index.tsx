import { useCallback, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import classNames from "classnames";
import ViewBox from "/@/components/ViewBox";
import MonacoEditorComponent from "/@/components/MonacoEditor";
import styles from "./index.module.less";
import useSizeObserver from "/@/hooks/useSizeHook";
import "/@/utils/monaco";
import MonacoBlockMenu from "/@/components/MonacoBlockMenu";
import { getReportMenuList } from "services";
import { MenuItem } from "services/entity/report-menu";

const defaultValue = `
func main() {
  fmt.Printf("这是一个非常长的字符串，用于测试Monaco Editor的自动换行功能。这是一个非常长的字符串，用于测试Monaco Editor的自动换行功能。")
}
`;

const EDITOR_OPTIONS = {
  selectOnLineNumbers: true,
  quickSuggestions: true, // 启用自动补全建议
  suggestOnTriggerCharacters: true, // 启用触发字符提示
  automaticLayout: true, // 自动布局
  quickSuggestionsDelay: 20, // 延迟触发补全建议 ms
};

export default function TemplateEditor() {
  const boxRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [editorInstance, setEditorInstance] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  const handleResize = useCallback(() => {
    editorRef.current?.layout();
  }, []);

  useSizeObserver(boxRef, handleResize);

  // 在编辑器挂载后初始化补全功能
  const editorDidMount = async (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
    setEditorInstance(editor);
  };

  useEffect(() => {
    getReportMenuList().then((res) => {
      setMenuList(res || []);
    });
  }, []);

  return (
    <>
      <ViewBox>
        <div
          className={classNames(styles["editor-box"], "h-[calc(100%-20px)]")}
          ref={boxRef}
        >
          <MonacoEditorComponent
            width="100%"
            height="100%"
            language="go"
            value={defaultValue}
            onChange={(value, event) => {
              console.log(value);
            }}
            options={{
              ...EDITOR_OPTIONS,
              wordWrap: "on", // 自动换行
              autoClosingQuotes: "always", // 自动添加引号
            }}
            editorDidMount={editorDidMount}
          />
          {editorInstance && <MonacoBlockMenu editor={editorInstance} menuList={menuList} />}
        </div>
      </ViewBox>
    </>
  );
}
