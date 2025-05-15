import { FC } from "react";
import MonacoEditor from "react-monaco-editor";
import { editor } from "monaco-editor";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";

interface MonacoEditorProps {
  width: string;
  height: string;
  language: string;
  options?: editor.IStandaloneEditorConstructionOptions;
  editorDidMount?: (editor: editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => void;
  onChange?: (value: string, event: editor.IModelContentChangedEvent) => void;
  value?: string;
}

const MonacoEditorComponent: FC<MonacoEditorProps> = (props) => {
  const { width = "100%", height = "100%", language = "go", editorDidMount = () => {}, value = "", onChange = () => {}, options = {} } = props;
  return (
    <>
      <MonacoEditor
        // theme="vs-dark"
        width={width}
        height={height}
        language={language}
        options={options}
        value={value}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </>
  );
};

export default MonacoEditorComponent;
