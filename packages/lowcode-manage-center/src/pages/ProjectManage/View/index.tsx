import { useCallback, useEffect, useState } from "react";
import { Button, Flex, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import ViewBox from "/@/components/ViewBox";
import { useStore } from "../Model";
import { GetPageList, GetProjectList } from "services";
import { SimpleProject } from "services/entity";
import { getUserName } from "common";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "/@/constants";
import { genAssets } from "../../../utils/genAssets";
import CustomTable from "../components/table";
// import DownloadModal from "../components/modal";

export default function ProjectManage() {
  const [api, contextHolder] = notification.useNotification();
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
        userName: getUserName(),
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

  const download = async (item: SimpleProject) => {
    const key = Date.now();
    try {
      // const item = itemRef.current!;
      const { id, name } = item;
      api.info({
        message: "正在下载资源",
        description: "下载较为耗时，请等待",
        showProgress: true,
        duration: 60,
        key
      });

      // 获取项目所有的页面
      const { pageList = [] } = await GetPageList({
        projectId: id,
        pageNum: DEFAULT_PAGE_NUMBER,
        // 最多 100 个
        pageSize: DEFAULT_PAGE_SIZE * 10,
      });

      await genAssets(pageList, "/", name);
      api.success({
        message: "下载资源完成",
        duration: 2
      });
    } catch (e) {
      console.log(e);
      message.error(`请求异常`);
    } finally {
      api.destroy(key);
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
        {contextHolder}
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
