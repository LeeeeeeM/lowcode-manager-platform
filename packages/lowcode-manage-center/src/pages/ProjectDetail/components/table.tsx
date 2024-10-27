import { FC } from "react";
import { Button, Flex, Table, type TableColumnsType } from "antd";
import { SimplePage } from "services/entity";
import { DEVELOP_LOWCODE_URL, LOWCODE_PATH_PREFIX, PAGE_SIG_ID } from "common";

interface CustomTableProps<T> {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  data?: T[];
  onChangePageSize: (v: number) => void;
  loading?: boolean;
  onClickAction?: (item: T) => void;
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
  } = props;

  const previewPage = (item: SimplePage) => {
    console.log(item, "jump");
    onClickAction(item);
  };

  const editPage = (item: SimplePage) => {
    window.open(
      `${
        import.meta.env.DEV ? DEVELOP_LOWCODE_URL : ""
      }${LOWCODE_PATH_PREFIX}?${PAGE_SIG_ID}=${item.id}`
    );
    console.log(item, "download");
  };

  const deletePage = (item: SimplePage) => {
    console.log(item, "delete");
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
        <Button type="link" onClick={() => deletePage(item)}>
          删除
        </Button>
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
