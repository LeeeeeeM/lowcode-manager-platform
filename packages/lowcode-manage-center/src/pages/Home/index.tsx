import { Button, Flex } from "antd";
import PageNav from "../../components/PageNav";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addStateCount,
  reduceStateCount,
} from "../../store/Reducer/Count/countReducer";

export default function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.countReducer.count);
  const addCount = () => {
    dispatch(addStateCount({ countNumber: 1 }));
  };

  const decreaseCount = () => {
    dispatch(reduceStateCount({ countNumber: 1 }));
  };

  return (
    <>
      <PageNav></PageNav>
      <div>Home Page</div>
      <Flex align="center" gap={10}>
        <Button type="primary" onClick={addCount}>
          增加
        </Button>
        <div>{count}</div>
        <Button type="primary" onClick={decreaseCount}>
          减少
        </Button>
      </Flex>
    </>
  );
}
