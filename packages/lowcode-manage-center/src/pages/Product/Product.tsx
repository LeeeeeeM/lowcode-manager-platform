import { Button } from "antd";
import { useNavigate } from 'react-router-dom'
import PageNav from "../../components/PageNav";

export default function Product() {
  const navigate = useNavigate();
  const jump = () => {
    navigate('/detail/123');
  }
  return (
    <>
      <PageNav></PageNav>
      <div>Product Page</div>
      <Button type="primary" onClick={jump}>
        跳转
      </Button>
    </>
  );
}
