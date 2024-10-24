import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ViewBox from "/@/components/ViewBox";
import FormInfo, { type FormData } from "/@/components/FormInfo";
import { CreateProject } from "/@/services";
import { CURRENT_USER_NAME } from "/@/constants";
import { message } from "antd";

export default function Product() {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({
    name: "",
    remark: "",
  });

  const changeValue = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const createNewProject = useCallback(async () => {
    try {
      const result = await CreateProject({
        userName: CURRENT_USER_NAME,
        ...data,
      });
      const { projectId } = result || {};
      navigate(`/project-detail/${projectId}`, {
        replace: true,
      });
      console.log(result, data);
    } catch (e) {
      message.warning(`${e}`);
    }
  }, [data]);

  return (
    <>
      <ViewBox>
        <FormInfo
          formData={data}
          onChange={changeValue}
          onSubmit={createNewProject}
        />
      </ViewBox>
    </>
  );
}
