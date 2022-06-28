import { ChangeEvent, MouseEvent, useState } from "react";
import TemplateButtons from "./buttons";
import TemplateInputs from "./inputs";
import styles from "./index.module.scss";
import { Box } from "@mui/material";

export type FormData = {
  templateName: string | undefined;
  templateMentor: string | undefined;
};

export default function TemplateForm() {
  const [entry, setEntry] = useState<FormData>({
    templateName: "",
    templateMentor: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/create/template", {
      method: "POST",
      body: JSON.stringify(entry),
    });
    const json = await response.json();

    console.log(json);
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEntry({
      templateName: "",
      templateMentor: "",
    });
  };

  return (
    <Box>
      <form className={styles.templateForm}>
        <TemplateInputs
          handleInputChange={handleInputChange}
          templateEntry={entry}
        />

        <TemplateButtons
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />
      </form>
    </Box>
  );
}
