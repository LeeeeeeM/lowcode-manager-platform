const fs = require("fs").promises;
const path = require("path");

const AntdLibName = "@ss-antd-material";
const CustomLibName = "@ss-custom";

// 获取comp文件夹路径
const AntdCompFolder = path.join(
  process.cwd(),
  "build",
  "resources",
  AntdLibName
);

// 获取comp文件夹路径
const CustomCompFolder = path.join(
  process.cwd(),
  "build",
  "resources",
  CustomLibName
);

const targetFolder = path.join(
  process.cwd(),
  "packages",
  "lowcode-general",
  "src",
  "assets"
);

// 异步函数处理读取和汇总meta-info.json文件
async function collectAntdMetaInfo() {
  try {
    // 读取comp文件夹下的所有子文件夹
    const subdirs = await fs.readdir(AntdCompFolder, { withFileTypes: true });

    // 用于存储所有meta-info.json对象的数组
    const metaInfoArray = [];

    // 遍历子文件夹
    for (const subdir of subdirs) {
      if (subdir.isDirectory()) {
        // 构建meta-info.json的路径
        const metaInfoPath = path.join(
          AntdCompFolder,
          subdir.name,
          "build",
          "lowcode",
          "meta-info.json"
        );

        // 尝试读取meta-info.json文件
        try {
          const metaInfoContent = await fs.readFile(metaInfoPath, "utf8");
          const metaInfoObject = JSON.parse(metaInfoContent);
          const { meta, lib, version } = metaInfoObject;

          // 将对象添加到数组中
          metaInfoArray.push({
            meta,
            lib,
            version,
            name: lib.replace(`${AntdLibName}/`, ""),
          });
        } catch (err) {
          console.error(
            `Error reading or parsing meta-info.json in ${subdir.name}:`,
            err
          );
        }
      }
    }

    // 输出到meta.json文件
    const metaJsonPath = path.join(targetFolder, "antd.meta.json");
    await fs.writeFile(
      metaJsonPath,
      JSON.stringify(metaInfoArray, null, 2),
      "utf8"
    );
    console.log("antd.meta.json file has been created successfully.");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

async function collectCustomMetaInfo() {
  try {
    // 读取comp文件夹下的所有子文件夹
    const subdirs = await fs.readdir(CustomCompFolder, { withFileTypes: true });

    // 用于存储所有meta-info.json对象的数组
    const metaInfoArray = [];

    // 遍历子文件夹
    for (const subdir of subdirs) {
      if (subdir.isDirectory()) {
        // 构建meta-info.json的路径
        const metaInfoPath = path.join(
          CustomCompFolder,
          subdir.name,
          "build",
          "lowcode",
          "meta-info.json"
        );

        // 尝试读取meta-info.json文件
        try {
          const metaInfoContent = await fs.readFile(metaInfoPath, "utf8");
          const metaInfoObject = JSON.parse(metaInfoContent);
          const { meta, lib, version } = metaInfoObject;

          // 将对象添加到数组中
          metaInfoArray.push({
            meta,
            lib,
            version,
            name: lib.replace(`${CustomLibName}/`, ""),
          });
        } catch (err) {
          console.error(
            `Error reading or parsing meta-info.json in ${subdir.name}:`,
            err
          );
        }
      }
    }

    // 输出到meta.json文件
    const metaJsonPath = path.join(targetFolder, "custom.meta.json");
    await fs.writeFile(
      metaJsonPath,
      JSON.stringify(metaInfoArray, null, 2),
      "utf8"
    );
    console.log("custom.meta.json file has been created successfully.");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

// 执行函数
collectAntdMetaInfo();
collectCustomMetaInfo();
