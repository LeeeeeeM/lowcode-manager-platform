import { FC, useRef, useState } from "react";
import {
  Button,
  Flex,
  message,
  Popconfirm,
  Table,
  type TableColumnsType,
} from "antd";
import dayjs from "dayjs";
import { Page } from "services/entity";
import { DEVELOP_LOWCODE_URL, LOWCODE_PATH_PREFIX, PAGE_SIG_ID } from "common";
import { DeletePage } from "services";
import { Action, DEFAULT_PAGE_NUMBER } from "/@/constants";

interface CustomTableProps<T> {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  data?: T[];
  onChangePageSize: (v: number) => void;
  loading?: boolean;
  onClickAction?: (item: T, action: Action) => void;
  reloadData?: (v: number) => Promise<unknown>;
}

const CustomTable: FC<CustomTableProps<Page>> = (props) => {
  const {
    total,
    pageSize,
    data,
    currentPage,
    onChangePageSize,
    loading,
    onClickAction = () => {},
    reloadData = () => {},
  } = props;
  const curretnDeleteRef = useRef<number>();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = (item: Page) => {
    curretnDeleteRef.current = item.id;
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      if (curretnDeleteRef.current) {
        await DeletePage({
          pageId: curretnDeleteRef.current,
        });
        await reloadData(DEFAULT_PAGE_NUMBER);
      }
    } catch {
      message.error(`请求异常`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const previewPage = (item: Page) => {
    onClickAction(item, Action.PREVIEW);
  };

  const editPage = (item: Page) => {
    window.open(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL + "/" : "/"
      }${LOWCODE_PATH_PREFIX}/?${PAGE_SIG_ID}=${item.id}`
    );
  };

  const modifyPageInfo = (item: Page) => {
    onClickAction(item, Action.MODIFY_INFO);
  };

  const renderAction = (item: Page) => {
    return (
      <Flex>
        <Button type="link" onClick={() => previewPage(item)}>
          预览
        </Button>
        <Button type="link" onClick={() => modifyPageInfo(item)}>
          修改页面信息
        </Button>
        <Button type="link" onClick={() => editPage(item)}>
          编辑页面
        </Button>
        <Popconfirm
          title={"删除当前页面"}
          okButtonProps={{ loading: confirmLoading }}
          onConfirm={handleOk}
        >
          <Button type="link" onClick={() => showPopconfirm(item)}>
            删除
          </Button>
        </Popconfirm>
      </Flex>
    );
  };

  const columns: TableColumnsType<Page> = [
    {
      title: "页面名称",
      width: 100,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "页面ID",
      width: 100,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "创建时间",
      dataIndex: "createOn",
      key: "createOn",
      width: 100,
      render(item) {
        return dayjs(Number(item)).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "页面标识",
      dataIndex: "identifier",
      key: "identifier",
      width: 100,
      render(item) {
        return item;
      },
    },
    {
      title: "操作列",
      key: "operation",
      fixed: "right",
      width: 200,
      render: renderAction,
    },
  ];

  return (
    <Table<Page>
      className="border-solid border rounded"
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      scroll={{ x: 1000, y: 600 }}
      pagination={{
        showSizeChanger: false,
        showQuickJumper: true,
        total: total,
        current: currentPage,
        pageSize: pageSize,
        onChange(v) {
          onChangePageSize(v);
        },
      }}
      sticky
    />
  );
};

export default CustomTable;
