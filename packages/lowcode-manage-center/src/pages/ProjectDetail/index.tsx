import { useAsyncEffect } from "ahooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProjectDetail } from "services";
import Loading from "/@/components/Loading";
import View from "./View";
import { useStore } from "./Model";


export const Entry = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState<Promise<unknown>>();

  const reset = useStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
    }
  }, [reset]);

  useAsyncEffect(async () => {
    const loader = GetProjectDetail({
      projectId: Number(id),
    });
    setLoader(loader);
    const result = await loader;
    const { project } = result || {};
    useStore.setState({
      projectInfo: {
        remark: project.remark || "",
        name: project.name,
      },
    });
  }, [id]);

  return (
    <Loading loadData={loader}>
      <View />
    </Loading>
  );
};
