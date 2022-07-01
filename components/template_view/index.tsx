import { useEffect, useState } from "react";
import SelectTemplate from "./select_template";

export const genericFetchOptions: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: undefined,
};

function TemplateView() {
  const [templates, setTemplates] = useState([]);
  const [page, setPage] = useState();
  useEffect(() => {
    async function GetSection() {
      const pageFetchOptions: RequestInit = {
        ...genericFetchOptions,
        body: JSON.stringify({
          displayName: "Training List",
        }),
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/retrieve/section",
          pageFetchOptions
        );
        const section = await response.json();
        return section;
      } catch (e) {
        console.log(`Error at GetSection(): ${e}`);
        return false;
      }
    }

    async function GetPages() {
      const section = await GetSection();
      if (!section.id) return;

      const pageFetchOptions: RequestInit = {
        ...genericFetchOptions,
        body: JSON.stringify({
          sectionID: section.id,
        }),
      };

      const response = await fetch(
        "http://localhost:3000/api/retrieve/pages",
        pageFetchOptions
      );
      const pages = await response.json();

      if (pages.length < 1) return;
      setTemplates(pages);
    }

    async function GetPage() {
      const section = await GetSection();

      if (!section.id) return;

      const pageFetchOptions: RequestInit = {
        ...genericFetchOptions,
        body: JSON.stringify({
          sectionID: section.id,
          title: "Level 1",
        }),
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/retrieve/page",
          pageFetchOptions
        );
        const page = await response.json();

        setPage(page);
      } catch (e) {
        console.log(`Error at GetPage(): ${e}`);
        return false;
      }
    }

    GetPages();

    return () => console.log("Data retrieved");
  }, []);

  return (
    <>
      <h1
        style={{
          color: "#787878",
          width: "50%",
          textAlign: "center",
          margin: "auto",
          fontFamily: "Arial",
        }}
      >
        View Templates 👉🥺👈
      </h1>
      <SelectTemplate templates={templates} />
    </>
  );
}

export default TemplateView;
