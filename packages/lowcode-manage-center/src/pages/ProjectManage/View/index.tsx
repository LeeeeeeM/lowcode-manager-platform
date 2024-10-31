import { useCallback, useEffect, useState } from "react";
import { Button, Flex, message } from "antd";
import { useNavigate } from "react-router-dom";
import ViewBox from "/@/components/ViewBox";
import { useStore } from "../Model";
import { GetPageList, GetProjectList } from "services";
import { SimpleProject } from "services/entity";
import { CURRENT_USER_NAME } from "common";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "/@/constants";
import { genAssets } from "../../../utils/genAssets";
import CustomTable from "../components/table";
// import DownloadModal from "../components/modal";

export default function ProjectManage() {
  const navigate = useNavigate();
  const total = useStore((state) => state.total);
  const data = useStore((state) => state.projectList);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [loading, setLoading] = useState(false);
  // const [visible, setVisible] = useState(false);

  // const itemRef = useRef<SimpleProject>();

  // const closeModal = () => {
  //   setVisible(false);
  // };

  const createNewProject = () => {
    navigate("/project-create");
  };

  const loadData = useCallback(async (v: number) => {
    try {
      setLoading(true);
      const result = await GetProjectList({
        userName: CURRENT_USER_NAME,
        pageNum: v,
        pageSize: DEFAULT_PAGE_SIZE,
      });
      const { total, projectList } = result || {};
      useStore.setState({
        total: Number(total) || 0,
        projectList: projectList || [],
      });
    } catch (e) {
      message.warning(`${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // const download = (item: SimpleProject) => {
  //   itemRef.current = item;
  //   setVisible(true);
  // };

  // const downloadImpl = async (dirPath: string) => {
  //   try {
  //     const item = itemRef.current!;
  //     const { id } = item;

  //     // 获取项目所有的页面
  //     const { pageList = [] } = await GetPageList({
  //       projectId: id,
  //       pageNum: DEFAULT_PAGE_NUMBER,
  //       // 最多 100 个
  //       pageSize: DEFAULT_PAGE_SIZE * 10,
  //     });

  //     genAssets(pageList, dirPath);
  //   } catch (e) {
  //     console.log(e);
  //     message.error(`请求异常`);
  //   }
  // };

  const download = async (item: SimpleProject) => {
    try {
      // const item = itemRef.current!;
      const { id, name } = item;

      // 获取项目所有的页面
      const { pageList = [] } = await GetPageList({
        projectId: id,
        pageNum: DEFAULT_PAGE_NUMBER,
        // 最多 100 个
        pageSize: DEFAULT_PAGE_SIZE * 10,
      });

      genAssets(pageList, '/', name);
    } catch (e) {
      console.log(e);
      message.error(`请求异常`);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [loadData, currentPage]);

  const onChangePageSize = useCallback(async (v: number) => {
    setCurrentPage(v);
  }, []);

  useEffect(() => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  }, []);

  return (
    <>
      <ViewBox>
        <Flex align="center" gap={10} className="mb-2">
          <Button onClick={createNewProject}>新建项目</Button>
        </Flex>
        <CustomTable
          {...{
            total,
            currentPage,
            data,
            onChangePageSize,
            loading,
            reloadData: loadData,
            onClickAction: download,
          }}
        />
        {/* <DownloadModal
          visible={visible}
          closeModal={closeModal}
          onConfirm={downloadImpl}
        /> */}
      </ViewBox>
    </>
  );
}
