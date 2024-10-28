import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, message, Popconfirm, Table, type TableColumnsType } from "antd";
import { SimpleProject } from "services/entity";
import { DEFAULT_PAGE_NUMBER } from "/@/constants";
import { DeleteProject } from "services";

interface CustomTableProps<T> {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  data?: T[];
  onChangePageSize: (v: number) => void;
  onClickAction?: (item: T) => void;
  loading?: boolean;
  reloadData?: (v: number) => Promise<unknown>;
}

const CustomTable: FC<CustomTableProps<SimpleProject>> = (props) => {
  const navigate = useNavigate();
  const {
    total,
    pageSize,
    data,
    currentPage,
    onChangePageSize,
    loading,
    reloadData = () => {},
    onClickAction = () => {}
  } = props;

  const curretnDeleteRef = useRef<number>();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = (item: SimpleProject) => {
    curretnDeleteRef.current = item.id;
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      if (curretnDeleteRef.current) {
        await DeleteProject({
          projectId: curretnDeleteRef.current,
        });
        await reloadData(DEFAULT_PAGE_NUMBER);
      }
    } catch {
      message.error(`请求异常`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const jumpToDetail = (item: SimpleProject) => {
    navigate(`/project-detail/${item.id}`);
  };

  const downloadProject = (item: SimpleProject) => {
    onClickAction(item);
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
        <Popconfirm
          title={"删除当前项目"}
          // open={open}
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
    },
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
