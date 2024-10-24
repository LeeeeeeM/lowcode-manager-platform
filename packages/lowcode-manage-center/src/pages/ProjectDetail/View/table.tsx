import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Table, type TableColumnsType } from "antd";

export interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface CustomTableProps {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  data?: DataType[];
  onChangePageSize: (v: number) => void;
}

const CustomTable: FC<CustomTableProps> = (props) => {
  const navigate = useNavigate();
  const { total, pageSize, data, currentPage, onChangePageSize } = props;

  const previewPage = (item: DataType) => {
    console.log(item, 'preview');
  };

  const editPage = (item: DataType) => {
    console.log(item, 'edit');
    navigate(`/detail/${item.key}`);
  };

  const deletePage = (item: DataType) => {
    console.log(item, 'delete');
  };

  const renderAction = (item: DataType) => {
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

  const columns: TableColumnsType<DataType> = [
    {
      title: "项目名称",
      width: 100,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "项目ID",
      width: 100,
      dataIndex: "age",
      key: "age",
    },
    {
      title: "项目备注",
      dataIndex: "address",
      key: "1",
      width: 100,
    },
    {
      title: "其他",
      dataIndex: "address",
      key: "2",
      width: 100,
    },
    {
      title: "操作咧",
      key: "operation",
      fixed: "right",
      width: 150,
      render: renderAction,
    }
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000, y: 600 }}
      pagination={{
        showSizeChanger: false,
        showQuickJumper: true,
        total: total,
        current: currentPage,
        pageSize: pageSize,
        onChange(v) {
          console.log(v);
          onChangePageSize(v);
        },
      }}
      sticky
    />
  );
};

export default CustomTable;
