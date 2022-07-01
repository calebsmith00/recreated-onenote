import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { genericFetchOptions } from ".";
import retrieveHTML from "./handle_training_data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 400 },
  { field: "sample", headerName: "Sample", width: 70 },
];

export default function TemplateTrainingTable({ template }: { template: any }) {
  const [rows, setRows] = useState<any[]>([]);
  async function GetPageContent() {
    try {
      const { id } = template;

      const pageFetchOptions: RequestInit = {
        ...genericFetchOptions,
        body: JSON.stringify({
          pageID: id,
        }),
      };

      const response = await fetch(
        "http://localhost:3000/api/retrieve/page-content",
        pageFetchOptions
      );

      const pageContent = await response.text();

      const { numberOfRows, elements } = retrieveHTML(pageContent);
      const tableRows = elements.filter((element) => element.category === "tr");
      tableRows.map((element) => {
        if (!element.elements) return;
        const rowLength = element.elements.length;
        const rowData = element.elements;

        for (let i = 0; i < rowLength; ++i) {
          const text = rowData[i].innerText.trim();
          console.log(rowData[i].id);
          if (text === "") continue;
          setRows((prevState) => [
            ...prevState,
            {
              id: rowData[i].id.toString(),
              sample: text,
            },
          ]);
        }
      });
    } catch (e) {
      console.error(`Error occurred at template_training_table: ${e}`);
      return e;
    }
  }

  if (template) {
    return (
      <>
        <button onClick={() => GetPageContent()}>Get Table</button>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </div>
      </>
    );
  }

  return <></>;
}
