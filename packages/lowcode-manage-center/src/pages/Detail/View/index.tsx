import { useParams } from "react-router-dom";
import { useStore } from "../Model";
import { Button } from "antd";
import { useEffect } from "react";

export default function Detail() {
  const params = useParams();
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);
  const reset = useStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
    }
  }, []);

  console.log(params, useStore.getState());
  return (
    <>
      <div>Detail Page {params?.id}</div>
      <h1>{bears} around here...</h1>
      <Button type="primary" onClick={increasePopulation}>
        one up
      </Button>
    </>
  );
}
