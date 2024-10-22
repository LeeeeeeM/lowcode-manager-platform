import { useParams } from "react-router-dom";

export default function Detail() {
  const params = useParams();

  console.log(params);
  return <div>Detail Page { params?.id }</div>;
}


