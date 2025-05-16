import { useEffect, useState } from "react";
import Loading from "/@/components/Loading";
import View from "./View";
import { useStore } from "./Model";
import { getReportMenuList } from "services";

export const Entry = () => {
  const store = useStore();
  const [loader, setLoader] = useState<Promise<any>>();

  useEffect(() => {
    let loader = getReportMenuList().then((menuList) => {
      store.setMenuList(menuList || []);
    });
    setLoader(loader);
  }, []);


  return (
    <Loading loadData={loader}>
      <View />
    </Loading>
  );
};