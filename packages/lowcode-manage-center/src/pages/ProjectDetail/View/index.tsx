import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, message, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { CreatePage, GetPageList, UpdatePage } from "services";
import { getUserName } from "common";
import {
  Action,
  DEFAULT_PAGE_INFO,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  PAGE_TYPE_TEXT_MAP,
} from "/@/constants";
import ViewBox from "/@/components/ViewBox";
import FormInfo from "/@/components/FormInfo";
import { useStore } from "../Model";
import CustomTable from "../components/table";
import CreateModal, { type PageInfo } from "../components/modal";
import PreviewModal from "../components/preview";
import { Page } from "services/entity";
import { PAGE_TYPE } from "services/constants";

interface CustomMenuItemType extends MenuItemType {
  key: PAGE_TYPE;
}

const items: CustomMenuItemType[] = [
  {
    label: PAGE_TYPE_TEXT_MAP[PAGE_TYPE.CUSTOM].text,
    key: PAGE_TYPE.CUSTOM,
  },
  {
    label: PAGE_TYPE_TEXT_MAP[PAGE_TYPE.FORM].text,
    key: PAGE_TYPE.FORM,
  },
];

export default function ProjectManage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectInfo = useStore((state) => state.projectInfo);
  const total = useStore((state) => state.total);
  const data = useStore((state) => state.pageList);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPreviewItem, setCurrentPreviewItem] = useState<Page>();
  const [currentPageInfo, setCurrentPageInfo] =
    useState<PageInfo>(DEFAULT_PAGE_INFO);
  const currentPageType = useRef<PAGE_TYPE>(PAGE_TYPE.CUSTOM);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    openModal(DEFAULT_PAGE_INFO);
    currentPageType.current = e.key as unknown as PAGE_TYPE;
    console.log("click", e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const openModal = (info: PageInfo) => {
    setVisible(true);
    setCurrentPageInfo(info);
  };

  const returnProject = () => {
    navigate(`/project-manage`);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const [previewVisible, setPreviewVisible] = useState(false);

  const dispatchAction = (item: Page, action: Action) => {
    switch (action) {
      case Action.PREVIEW:
        openPreviewModal(item);
        break;
      case Action.MODIFY_INFO:
        openModal({
          name: item.name,
          identifier: item.identifier,
          id: item.id,
        });
        break;
      default:
        break;
    }
  };

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

  const createOrSaveNewPage = useCallback(
    async (info: PageInfo) => {
      const { name, identifier, pageType } = info;
      try {
        if (currentPageInfo.id) {
          await UpdatePage({
            projectId: Number(id),
            pageId: currentPageInfo.id,
            name,
            userName: getUserName(),
            identifier,
            pageType: pageType!,
          });
        } else {
          await CreatePage({
            projectId: Number(id),
            name,
            userName: getUserName(),
            identifier,
            pageType: Number(currentPageType.current),
          });
        }

        setCurrentPage(DEFAULT_PAGE_NUMBER);

        // 重新获取当前
        await loadData(DEFAULT_PAGE_NUMBER);
      } catch (e) {
        message.error(`请求异常: ${e}`);
      }
    },
    [currentPageInfo.id, id, loadData]
  );

  const onChangePageSize = useCallback(async (v: number) => {
    setCurrentPage(v);
    loadData(v);
  }, []);

  useEffect(() => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
    loadData(DEFAULT_PAGE_NUMBER);
  }, []);

  return (
    <>
      <ViewBox>
        <FormInfo editable={false} formData={projectInfo} showSubmit={false} />
        <Flex align="center" gap={10} className="mb-2">
          <Button onClick={returnProject}>返回项目</Button>
          <Dropdown menu={menuProps}>
            <Button type="primary">
              新建页面
              <DownOutlined />
            </Button>
          </Dropdown>
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
