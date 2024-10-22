import { useEffect } from "react";
import Home from "./index";


export const Entry = () => {
  // const [inited, setInited] = useState(false);
  useEffect(() => {
    return () => {

    }
  }, []);

  // return inited ? <Home /> : null
  return <Home />
};