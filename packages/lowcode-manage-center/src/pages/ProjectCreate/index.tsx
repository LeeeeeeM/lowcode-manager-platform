import Loading from "/@/components/Loading";
import View from "./View";

export const Entry = () => {
  const loader = fetch(`api/v2/code/get_license_test`);

  return (
    <Loading loadData={loader}>
      <View />
    </Loading>
  );
};