import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, message } from "antd";
import { CreatePage, GetPageList, UpdatePage } from "services";
import { CURRENT_USER_NAME } from "common";
import {
  DEFAULT_PAGE_INFO,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "/@/constants";
import ViewBox from "/@/components/ViewBox";
import FormInfo from "/@/components/FormInfo";
import { useStore } from "../Model";
import CustomTable, { Action } from "../components/table";
import CreateModal, { type PageInfo } from "../components/modal";
import PreviewModal from "../components/preview";
import { Page } from "services/entity";

export default function ProjectManage() {
  const { id } = useParams();

  const projectInfo = useStore((state) => state.projectInfo);
  const total = useStore((state) => state.total);
  const data = useStore((state) => state.pageList);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPreviewItem, setCurrentPreviewItem] = useState<Page>();
  const [currentPageInfo, setCurrentPageInfo] =
    useState<PageInfo>(DEFAULT_PAGE_INFO);

  const openModal = (info: PageInfo) => {
    setVisible(true);
    setCurrentPageInfo(info);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const [previewVisible, setPreviewVisible] = useState(false);

  const dispatchAction = (item: Page, action: Action) => {
    switch(action) {
      case Action.PREVIEW:
        openPreviewModal(item);
        break;
      case Action.MODIFY_INFO:
        console.log(222);
        openModal({
          name: item.name,
          identifier: item.identifier,
          id: item.id
        });
        break;
      default:
        break;
    }
  }

  const openPreviewModal = (item: Page) => {
    setCurrentPreviewItem(item);
    setPreviewVisible(true);
  };

  const closePreviewModal = () => {
    setPreviewVisible(false);
  };

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);

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

  const createOrSaveNewPage = useCallback(async (info: PageInfo) => {
    const { name, identifier } = info;
    console.log(info)
    try {
      if (currentPageInfo.id) {
        await UpdatePage({
          projectId: Number(id),
          pageId: currentPageInfo.id,
          name,
          userName: CURRENT_USER_NAME,
          identifier,
        });
      } else {
        await CreatePage({
          projectId: Number(id),
          name,
          userName: CURRENT_USER_NAME,
          identifier,
        });
      }

      // 重新获取当前
      await loadData(DEFAULT_PAGE_NUMBER);
    } catch(e) {
      message.error(`请求异常: ${e}`);
    }
  }, [currentPageInfo.id, id, loadData]);

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
          <Button onClick={() => openModal(DEFAULT_PAGE_INFO)}>新建页面</Button>
        </Flex>
        <CustomTable
          {...{
            total,
            currentPage,
            data,
            onChangePageSize,
            loading,
            onClickAction: dispatchAction,
            reloadData: loadData,
          }}
        />
      </ViewBox>
      <CreateModal
        visible={visible}
        closeModal={closeModal}
        onConfirm={createOrSaveNewPage}
        info={currentPageInfo}
      />
      <PreviewModal
        visible={previewVisible}
        closeModal={closePreviewModal}
        info={currentPreviewItem}
      />
    </>
  );
}
