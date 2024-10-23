import { Button, Flex } from "antd";
import { useLoaderData } from "react-router-dom";
import PageNav from "../../components/PageNav";
import { useStore } from "./Model";

export default function Home() {
  const count = useStore((state) => state.count);
  const addCount = useStore((state) => state.addStateCount);
  const decreaseCount = useStore((state) => state.reduceStateCount);
  const albums = useLoaderData();
  console.log(albums);

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
