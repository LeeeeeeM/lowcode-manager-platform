import { useEffect, useMemo, useState } from "react";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import ViewBox from "/@/components/ViewBox";
import { DEFAULT_PAGE_SIZE } from "/@/constants";
import { useStore } from "../Model";
import CustomTable, { DataType } from "./table";


export default function ProjectManage() {
  const count = useStore((state) => state.count);
  const addCount = useStore((state) => state.addStateCount);
  const decreaseCount = useStore((state) => state.reduceStateCount);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const createNewProject = () => {
    navigate('/project-create')
  };

  const onChangePageSize = (v: number) => {
    setCurrentPage(v);
  };

  const total = 500;

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  }));

  const currentPageData = useMemo(() => {
    return dataSource.slice((currentPage - 1) * DEFAULT_PAGE_SIZE, currentPage * DEFAULT_PAGE_SIZE);
  }, [currentPage, dataSource]);

  return (
    <>
      <ViewBox>
        <Flex align="center" gap={10} className="mb-2">
          <Button onClick={createNewProject}>新建项目</Button>
          <Button type="primary" onClick={addCount}>
            增加
          </Button>
          <div>{count}</div>
          <Button type="primary" onClick={decreaseCount}>
            减少
          </Button>
        </Flex>
        <CustomTable {...{
          total,
          currentPage,
          data: currentPageData,
          onChangePageSize
        }}/>
      </ViewBox>
    </>
  );
}
