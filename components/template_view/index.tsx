import { useEffect } from "react";
import { client } from "../../pages/api/auth/authorize";

export default function TemplateView() {
  useEffect(() => {
    console.log(client.api(""));
  }, []);
  return <>View</>;
}
