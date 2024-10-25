import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Table, type TableColumnsType } from "antd";
import { SimplePage } from "/@/services/entity";

interface CustomTableProps<T> {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  data?: T[];
  onChangePageSize: (v: number) => void;
  loading?: boolean;
}

const CustomTable: FC<CustomTableProps<SimplePage>> = (props) => {
  const navigate = useNavigate();
  const { total, pageSize, data, currentPage, onChangePageSize, loading } = props;

  const jumpToDetail = (item: SimplePage) => {
    console.log(item, 'jump');
    navigate(`/project-detail/${item.id}`);
  };

  const downloadProject = (item: SimplePage) => {
    console.log(item, 'download');
  };

  const deleteProject = (item: SimplePage) => {
    console.log(item, 'delete');
  };

  const renderAction = (item: SimplePage) => {
    return (
      <Flex>
        <Button type="link" onClick={() => jumpToDetail(item)}>
          详情
        </Button>
        <Button type="link" onClick={() => downloadProject(item)}>
          下载
        </Button>
        <Button type="link" onClick={() => deleteProject(item)}>
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
    }
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
