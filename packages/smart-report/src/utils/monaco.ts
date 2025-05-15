import * as monaco from "monaco-editor";
import "monaco-editor/esm/vs/basic-languages/go/go.contribution"; // 加载 Go 语言支持
// @ts-ignore
import { language } from "monaco-editor/esm/vs/basic-languages/go/go"; // 加载 Go 语言支持

// 先暂时支持 true 和 false 的补全
monaco.languages.registerCompletionItemProvider("go", {
  provideCompletionItems: function (model, position) {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    const keywords = language?.keywords || [];
    const suggestions = keywords.map((keyword: string) => ({
      label: keyword,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: keyword,
      range: range,
    }));
    return {
      suggestions,
    };
  },
});
