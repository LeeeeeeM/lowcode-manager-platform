import { FC, useRef, useState } from "react";
import {
  Button,
  Flex,
  message,
  Popconfirm,
  Table,
  type TableColumnsType,
} from "antd";
import { SimplePage } from "services/entity";
import { DEVELOP_LOWCODE_URL, LOWCODE_PATH_PREFIX, PAGE_SIG_ID } from "common";
import { DeletePage } from "services";
import { DEFAULT_PAGE_NUMBER } from "/@/constants";

interface CustomTableProps<T> {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  data?: T[];
  onChangePageSize: (v: number) => void;
  loading?: boolean;
  onClickAction?: (item: T) => void;
  reloadData?: (v: number) => Promise<unknown>;
}

const CustomTable: FC<CustomTableProps<SimplePage>> = (props) => {
  const {
    total,
    pageSize,
    data,
    currentPage,
    onChangePageSize,
    loading,
    onClickAction = () => {},
    reloadData = () => {}
  } = props;
  const curretnDeleteRef = useRef<number>();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = (item: SimplePage) => {
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

  const previewPage = (item: SimplePage) => {
    onClickAction(item);
  };

  const editPage = (item: SimplePage) => {
    window.open(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL : ""
      }${LOWCODE_PATH_PREFIX}?${PAGE_SIG_ID}=${item.id}`
    );
  };

  const renderAction = (item: SimplePage) => {
    return (
      <Flex>
        <Button type="link" onClick={() => previewPage(item)}>
          预览
        </Button>
        <Button type="link" onClick={() => editPage(item)}>
          编辑
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

  const columns: TableColumnsType<SimplePage> = [
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
      title: "页面备注",
      dataIndex: "address",
      key: "1",
      width: 100,
    },
    {
      title: "操作列",
      key: "operation",
      fixed: "right",
      width: 150,
      render: renderAction,
    },
  ];

  return (
    <Table<SimplePage>
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
