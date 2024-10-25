import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Table, type TableColumnsType } from "antd";
import { SimpleProject } from "/@/services/entity";

interface CustomTableProps<T> {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  data?: T[];
  onChangePageSize: (v: number) => void;
  loading?: boolean;
}

const CustomTable: FC<CustomTableProps<SimpleProject>> = (props) => {
  const navigate = useNavigate();
  const { total, pageSize, data, currentPage, onChangePageSize, loading } = props;

  const jumpToDetail = (item: SimpleProject) => {
    console.log(item, 'jump');
    navigate(`/project-detail/${item.id}`);
  };

  const downloadProject = (item: SimpleProject) => {
    console.log(item, 'download');
  };

  const deleteProject = (item: SimpleProject) => {
    console.log(item, 'delete');
  };

  const renderAction = (item: SimpleProject) => {
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

  const columns: TableColumnsType<SimpleProject> = [
    {
      title: "项目名称",
      width: 100,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "项目ID",
      width: 100,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "项目备注",
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
    <Table<SimpleProject>
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
