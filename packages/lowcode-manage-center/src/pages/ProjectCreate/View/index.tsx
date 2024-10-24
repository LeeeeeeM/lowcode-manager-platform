import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import ViewBox from "/@/components/ViewBox";

export default function Product() {
  const navigate = useNavigate();
  const saveNewProject = () => {
    navigate(`/project-detail/${0}`, {
      replace: true
    })
  };

  return (
    <>
      <ViewBox>
        <Flex align="center" gap={10} className="mb-2">
          <Button onClick={saveNewProject}>保存项目</Button>
        </Flex>
        <div>[WIP]正在开发中，暂不开放</div>
      </ViewBox>
    </>
  );
}
