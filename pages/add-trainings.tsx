import type { NextPage, NextPageContext } from "next";
import TrainingTable from "../components/training_table";

const AddTrainings: NextPage = () => {
  return <TrainingTable />;
};

export async function getServerSideProps(context: NextPageContext) {
  const requestNotebookBody = {
    displayName: "Master Notebooks",
  };

  if (!context.req) return { props: {} };
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(requestNotebookBody),
    headers: {
      "Content-Type": "application/json",
      Cookie: context.req.headers.cookie || "",
    },
  };

  try {
    const notebook = await fetch(
      "http://localhost:3000/api/retrieve/notebook",
      options
    );
    const notebookJson = await notebook.json();

    return {
      props: {},
    };
  } catch (e) {
    console.error(`Error has occurred at /add-trainings: ${e}`);
    return {
      props: {
        error: JSON.stringify(e),
      },
    };
  }
}

export default AddTrainings;
