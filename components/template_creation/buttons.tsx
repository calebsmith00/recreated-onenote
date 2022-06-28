import { Button, ButtonGroup } from "@mui/material";
import { MouseEventHandler } from "react";
import styles from "./button.module.scss";

type ButtonProps = {
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  handleClear: MouseEventHandler<HTMLButtonElement>;
};

export default function TemplateButtons({
  handleSubmit,
  handleClear,
}: ButtonProps) {
  return (
    <ButtonGroup className={styles.buttons}>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button onClick={handleClear}>Clear</Button>
    </ButtonGroup>
  );
}
