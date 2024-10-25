import { useAsyncEffect } from "ahooks";
import { useParams } from "react-router-dom";
import Loading from "/@/components/Loading";
import View from "./View";
import { useStore } from "./Model";
import { GetProjectDetail } from "/@/services";
import { useState } from "react";

export const Entry = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState<Promise<unknown>>();

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
