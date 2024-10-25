import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, message } from "antd";
import { CreatePage, GetPageList } from "services";
import { CURRENT_USER_NAME } from "common";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "/@/constants";
import ViewBox from "/@/components/ViewBox";
import FormInfo from "/@/components/FormInfo";
import { useStore } from "../Model";
import CustomTable from "../components/table";
import CreateModal from "../components/modal";
import PreviewModal from "../components/preview";
import { SimplePage } from "services/entity";

export default function ProjectManage() {
  const { id } = useParams();

  const projectInfo = useStore((state) => state.projectInfo);
  const total = useStore((state) => state.total);
  const data = useStore((state) => state.pageList);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPreviewItem, setCurrentPreviewItem] = useState<SimplePage>();

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const [previewVisible, setPreviewVisible] = useState(false);

  const openPreviewModal = (item: SimplePage) => {
    setCurrentPreviewItem(item);
    setPreviewVisible(true);
  }

  const closePreviewModal = () => {
    setPreviewVisible(false);
  }

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);

  const createNewPage = async (name: string) => {
    const { pageId } = await CreatePage({
      projectId: Number(id),
      name,
      userName: CURRENT_USER_NAME
    });
    // 重新获取当前
    await loadData(DEFAULT_PAGE_NUMBER);
    console.log(pageId);
    // navigate("/project-create");
  };

  const loadData = useCallback(
    async (v: number) => {
      try {
        setLoading(true);
        const result = await GetPageList({
          projectId: Number(id),
          pageNum: v,
          pageSize: DEFAULT_PAGE_SIZE,
        });
        const { total, pageList } = result || {};
        useStore.setState({
          total: Number(total) || 0,
          pageList: pageList || [],
        });
      } catch (e) {
        message.warning(`${e}`);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

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
        <FormInfo editable={false} formData={projectInfo} showSubmit={false} />
        <Flex align="center" gap={10} className="mb-2">
          <Button onClick={openModal}>新建页面</Button>
        </Flex>
        <CustomTable
          {...{
            total,
            currentPage,
            data,
            onChangePageSize,
            loading,
            onClickAction: openPreviewModal
          }}
        />
      </ViewBox>
      <CreateModal visible={visible} closeModal={closeModal} onConfirm={createNewPage}/>
      <PreviewModal visible={previewVisible} closeModal={closePreviewModal} info={currentPreviewItem}/>
    </>
  );
}
