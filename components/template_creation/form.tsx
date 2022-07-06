/**
 * @packageDocumentation
 * @module TemplateForm
 */

import { ChangeEvent, MouseEvent, useState } from "react";
import TemplateButtons from "./buttons";
import TemplateInputs from "./inputs";
import styles from "./index.module.scss";
import { Box } from "@mui/material";

export type FormData = {
  templateName: string | undefined;
  templateMentor: string | undefined;
};

/**
 * @category Components
 */
export default function TemplateForm() {
  const [entry, setEntry] = useState<FormData>({
    templateName: "",
    templateMentor: "",
  });
  const [templateCreated, setTemplateCreated] = useState({
    success: false,
    error: false,
    page: {
      id: 0,
      links: {
        oneNoteWebUrl: {
          href: null,
        },
      },
      title: "",
    },
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
      credentials: "include",
    });
    const json = await response.json();

    if (json.error)
      setTemplateCreated({
        ...templateCreated,
        error: true,
      });
    if (json.success)
      setTemplateCreated({
        error: false,
        success: true,
        page: json.page,
      });
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEntry({
      templateName: "",
      templateMentor: "",
    });
  };
  return templateCreated.success ? (
    <Box>
      <a href={templateCreated.page.links.oneNoteWebUrl.href || undefined}>
        {templateCreated.page.title}
      </a>
    </Box>
  ) : (
    <Box>
      <form className={styles.templateForm}>
        <h1 style={{ color: "#787878" }}>Create a Template</h1>
        <TemplateInputs
          handleInputChange={handleInputChange}
          templateEntry={entry}
        />

        <TemplateButtons
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />
      </form>

      {templateCreated.error && (
        <p style={{ textAlign: "center" }}>
          There seems to be an error when creating your template.
        </p>
      )}
    </Box>
  );
}
