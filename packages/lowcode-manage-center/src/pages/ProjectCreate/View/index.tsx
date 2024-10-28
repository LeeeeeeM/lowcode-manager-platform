import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCallback, useState } from "react";
import ViewBox from "/@/components/ViewBox";
import FormInfo from "/@/components/FormInfo";
import { CreateProject } from "services";
import { CURRENT_USER_NAME } from "common";
import { ProjectInfo } from "services/entity";

export default function Product() {
  const navigate = useNavigate();
  const [data, setData] = useState<ProjectInfo>({
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
    } catch (e) {
      message.warning(`${e}`);
    }
  }, [data, navigate]);

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
