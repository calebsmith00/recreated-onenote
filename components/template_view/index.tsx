import { MouseEvent } from "react";

function TemplateView() {
  const getNotebook = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const body = JSON.stringify({
      displayName: "Master Notebooks",
    });

    const options: RequestInit = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body,
      method: "POST",
      credentials: "include",
    };
    const notebook = await fetch(
      "http://localhost:3000/api/retrieve/notebook",
      options
    );

    console.log(notebook);
  };

  return (
    <>
      <form>
        <button type="submit" onClick={getNotebook}>
          Get notebooks
        </button>
      </form>
    </>
  );
}

export default TemplateView;
