/**
 * @packageDocumentation
 * @module TemplateButtons
 */

import { Button, ButtonGroup } from "@mui/material";
import { MouseEventHandler } from "react";
import styles from "./button.module.scss";

export type ButtonProps = {
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  handleClear: MouseEventHandler<HTMLButtonElement>;
};

/**
 * @category Components
 */
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
