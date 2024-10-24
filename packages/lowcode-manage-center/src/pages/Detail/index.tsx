import { useEffect } from "react";
import View from "./View";



export const Entry = () => {
  useEffect(() => {
    return () => {
      console.log(111);
    }
  }, []);

  return <View />
};