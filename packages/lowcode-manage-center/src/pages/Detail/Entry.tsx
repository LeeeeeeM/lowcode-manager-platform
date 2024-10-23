import { useEffect } from "react";
import Detail from "./index";



export const Entry = () => {
  useEffect(() => {
    return () => {
      console.log(111);
    }
  }, []);

  return <Detail />
};