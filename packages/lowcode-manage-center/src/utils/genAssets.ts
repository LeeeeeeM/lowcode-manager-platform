import jsZip from "jszip";
import { parse, serialize, html } from "parse5";
import pbp from "path-browserify";
import { saveAs } from "file-saver";
import { SimplePage } from "services/entity";
import { apiInstance as axios } from "services/api/request";
import {
  appendNodeText,
  findNodeById,
  findNodeByTag,
  getNodeAttr,
  modifyNodeAttr,
  modifyNodeText,
  type Element,
} from "/@/utils/node";
import {
  DEVELOP_LOWCODE_URL,
  INJECT_PARAMS,
  LOWCODE_PATH_PREFIX,
} from "common";

const generatePageContent = (
  content: string,
  dirPath: string,
  options: Pick<SimplePage, "name" | "id" | "content" | "assets">
) => {
  const doc = parse(content) as unknown as Element;
  const { name, id, content: tpl, assets } = options;
  const pagePath = pbp.join(dirPath, `${id}`);

  // 处理 title
  const titleNode = findNodeByTag(doc, html.TAG_NAMES.TITLE);
  modifyNodeText(titleNode, name);

  // 处理 tpl
  const scriptTplNode = findNodeById(doc, INJECT_PARAMS.INJECT_TEMPLATE_ID);
  const tempInjectCode = `window.__projectSchema__ = ${tpl};window.__projectPackages__ = ${assets};`;
  appendNodeText(scriptTplNode, tempInjectCode);

  // 处理 css
  const cssNode = findNodeById(doc, INJECT_PARAMS.INJECT_CSS_ID);
  const href = getNodeAttr(cssNode, "href");
  const relativeCssPath = pbp.relative(pagePath, href!);
  modifyNodeAttr(cssNode, "href", relativeCssPath);

  // 处理 js
  const jsNode = findNodeById(doc, INJECT_PARAMS.INJECT_JS_ID);
  const jsSrc = getNodeAttr(jsNode, "src");
  const relativeJsPath = pbp.relative(pagePath, jsSrc!);
  modifyNodeAttr(jsNode, "src", relativeJsPath);

  // 生成新模板
  const newTpl = serialize(doc);

  return {
    newTpl,
    pagePath,
  };
};

export const genAssets = async (pageList: SimplePage[], dirPath: string) => {
  // 下载 HTML、JS、CSS 资源
  const [htmlContent, jsContent, cssContent] = await Promise.all([
    axios.get(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL : ""
      }${LOWCODE_PATH_PREFIX}/activity.html`
    ),
    axios.get(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL : ""
      }${LOWCODE_PATH_PREFIX}/js/activity.js`
    ),
    axios.get(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL : ""
      }${LOWCODE_PATH_PREFIX}/css/activity.css`
    ),
  ]);

  const zipX = new jsZip();
  zipX.file(`js/activity.js`, jsContent);
  zipX.file(`css/activity.css`, cssContent);

  pageList.forEach((page: SimplePage) => {
    const { name, id, assets, content } = page;
    const { newTpl, pagePath } = generatePageContent(htmlContent, dirPath, {
      content,
      assets,
      id,
      name,
    });
    zipX.file(`${pagePath}/index.html`, newTpl);
  });

  const blob = await zipX.generateAsync({ type: "blob" });

  saveAs(blob, "assets.zip");
};
