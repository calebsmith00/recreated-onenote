/**
 * @packageDocumentation
 * @module TrainingTable
 */

import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./index.module.scss";

/**
 * @category Components
 */
export default function TrainingTable() {
  const [title, setTitle] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const requestBody = {
      pageID: "",
      trainingTitle: title,
    };

    const response = await fetch("http://localhost:3000/api/create/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageID:
          "1-fb833e1063f34d8aa9b49af3c9377cbf!97-942cea58-0754-4e0a-bbc9-7c62f66a6b56",
        trainingTitle: title,
      }),
    });

    const json = await response.json();

    return json;
  };

  return (
    <Box>
      <h1 className={styles.trainingTitle}>Add Trainings Below</h1>
      <form className={styles.trainingForm}>
        <TextField
          label="Training Title"
          onChange={handleChange}
          value={title}
        />

        <Button
          variant="outlined"
          color="success"
          className={styles.trainingSubmitBtn}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
