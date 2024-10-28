import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Flex, message } from "antd";
import { useNavigate } from "react-router-dom";
import ViewBox from "/@/components/ViewBox";
import { useStore } from "../Model";
import CustomTable from "../components/table";
import { GetProjectList } from "services";
import { CURRENT_USER_NAME } from "common";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "/@/constants";
import { SimpleProject } from "services/entity";
import DownloadModal from "../components/modal";

export default function ProjectManage() {
  const navigate = useNavigate();
  const total = useStore((state) => state.total);
  const data = useStore((state) => state.projectList);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const itemRef = useRef<number>();

  const closeModal = () => {
    setVisible(false);
  };

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
        projectList: projectList || []
      });
    } catch (e) {
      message.warning(`${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const download = (item: SimpleProject) => {
    console.log(item);
    itemRef.current = item.id;
    setVisible(true);
  }

  const downloadImpl = async (path: string) => {
    console.log(path);
  }

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
            onClickAction: download
          }}
        />
        <DownloadModal visible={visible} closeModal={closeModal} onConfirm={downloadImpl}/>
      </ViewBox>
    </>
  );
}
