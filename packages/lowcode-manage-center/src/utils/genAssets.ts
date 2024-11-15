import jsZip from "jszip";
import { parse, serialize, html } from "parse5";
import pbp from "path-browserify";
import { saveAs } from "file-saver";
import { Page } from "services/entity";
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
  DEVELOP_PORTAL_URL,
  INJECT_PARAMS,
  LOWCODE_PATH_PREFIX,
  PageConfig,
  PORTAL_NAME,
  ProjectConfInterface,
} from "common";

const generatePageContent = (
  content: string,
  dirPath: string,
  options: Pick<Page, "name" | "id" | "content" | "assets" | "identifier">
) => {
  const doc = parse(content) as unknown as Element;
  const { name, id, content: tpl, assets } = options;
  const pagePath = pbp.join(dirPath, `${id}`);

  // 处理 title
  const titleNode = findNodeByTag(doc, html.TAG_NAMES.TITLE);
  modifyNodeText(titleNode, name);

  // 处理 tpl
  const scriptTplNode = findNodeById(doc, INJECT_PARAMS.INJECT_TEMPLATE_ID);
  const tempInjectCode = `window.__projectSchema__=${tpl};window.__projectPackages__=${assets};`;
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

  // 处理 icon
  const iconNode = findNodeById(doc, INJECT_PARAMS.INJECT_ICON_ID);
  const iconHref = getNodeAttr(iconNode, "href");
  const relativeIconPath = pbp.relative(pagePath, iconHref!);
  modifyNodeAttr(iconNode, "href", relativeIconPath);

  // 生成新模板
  const newTpl = serialize(doc);

  return {
    newTpl,
    pagePath,
  };
};

const generatePortalPageContent = (
  content: string,
  pages: Page[],
  projectName: string
): string => {
  const doc = parse(content) as unknown as Element;

  const pageConfs: PageConfig[] = pages.map((page: Page) => {
    const { name, identifier } = page;
    return {
      name,
      identifier,
      url: `/pages/${identifier}.html`,
    };
  });

  // 处理 title
  const titleNode = findNodeByTag(doc, html.TAG_NAMES.TITLE);
  modifyNodeText(titleNode, projectName);

  const projectConfig: ProjectConfInterface = {
    portalConfig: {
      hasNav: true,
      hasTitle: false,
      projectTitle: projectName,
    },
    pageConfigList: pageConfs,
  };

  // 处理 tpl
  const scriptTplNode = findNodeById(doc, INJECT_PARAMS.INJECT_PORTAL_TMP_ID);
  const tempInjectCode = `window.__PROJECT_CONFIG__=${JSON.stringify(
    projectConfig
  )};`;
  modifyNodeText(scriptTplNode, tempInjectCode);

  const newTpl = serialize(doc);
  return newTpl;
};

export const genAssets = async (
  pageList: Page[],
  dirPath: string,
  projectName: string
) => {
  // 下载 HTML、JS、CSS 资源
  const [htmlContent, jsContent, cssContent, iconContent] = await Promise.all([
    axios.get(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL + "/" : "/"
      }${LOWCODE_PATH_PREFIX}/activity.html`
    ),
    axios.get(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL + "/" : "/"
      }${LOWCODE_PATH_PREFIX}/js/activity.js`
    ),
    axios.get(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL + "/" : "/"
      }${LOWCODE_PATH_PREFIX}/css/activity.css`
    ),
    axios.get(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL + "/" : "/"
      }${LOWCODE_PATH_PREFIX}/favicon.ico`,
      {
        responseType: "blob",
      }
    ),
  ]);

  // 下载 PORTAL HTML、JS、CSS 资源
  const [htmlPortalContent, jsPortalContent, cssPortalContent] =
    await Promise.all([
      axios.get(
        `${
          import.meta.env.DEV ? DEVELOP_PORTAL_URL + "/" : "/"
        }${PORTAL_NAME}/index.html`
      ),
      axios.get(
        `${
          import.meta.env.DEV ? DEVELOP_PORTAL_URL + "/" : "/"
        }${PORTAL_NAME}/js/index.js`
      ),
      axios.get(
        `${
          import.meta.env.DEV ? DEVELOP_PORTAL_URL + "/" : "/"
        }${PORTAL_NAME}/css/index.css`
      ),
    ]);

  const zipX = new jsZip();
  // 压缩最终页
  zipX.file(`js/activity.js`, jsContent);
  zipX.file(`css/activity.css`, cssContent);
  zipX.file(`favicon.ico`, iconContent, { createFolders: false });

  // 压缩 portal
  zipX.file(`js/index.js`, jsPortalContent);
  zipX.file(`css/index.css`, cssPortalContent);

  pageList.forEach((page: Page) => {
    const { name, id, assets, content, identifier } = page;
    const { newTpl } = generatePageContent(htmlContent, dirPath, {
      content,
      assets,
      id,
      identifier,
      name,
    });
    zipX.file(`pages/${identifier}.html`, newTpl);
  });

  const newPortalHtmlContent = generatePortalPageContent(
    htmlPortalContent,
    pageList,
    projectName
  );

  zipX.file(`index.html`, newPortalHtmlContent);

  const blob = await zipX.generateAsync({ type: "blob" });

  saveAs(blob, "assets.zip");
};
