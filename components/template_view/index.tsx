import { useEffect } from "react";
import { client } from "../../pages/api/auth/authorize";

function TemplateView() {
  useEffect(() => {
    console.log(client.api(""));
  }, []);
  return <>View</>;
}

export default TemplateView;
