import { useEffect, useState } from "react";
import Home from "./index";
import { Spin } from "antd";


export const Entry = () => {
  const [inited, setInited] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInited(true);
    }, 1000);
    return () => {
      console.log(122);
    }
  }, []);

  // return inited ? <Home /> : null
  return <>{
    !inited ? <Spin/> :<Home />
  }</>
};