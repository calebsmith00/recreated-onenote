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

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("Clicked");
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEntry({
      templateName: "",
      templateMentor: "",
    });
  };

  return (
    <form className={styles.templateForm}>
      <Box className={styles.boxTest}>Asdf</Box>
      <TemplateInputs
        handleInputChange={handleInputChange}
        templateEntry={entry}
      />

      <TemplateButtons handleSubmit={handleSubmit} handleClear={handleClear} />
    </form>
  );
}
