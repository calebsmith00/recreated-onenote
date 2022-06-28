import { useEffect, useState } from "react";
import { client } from "../../helpers/graph_client";

function TemplateView() {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (clicked) client.api("onenote/notebooks");
  }, [clicked]);
  return (
    <>
      <button onClick={() => setClicked(!clicked)}>Click</button>
    </>
  );
}

export default TemplateView;
