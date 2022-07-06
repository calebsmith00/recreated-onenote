/**
 * @packageDocumentation
 * @module TemplateInput
 */

import { TextField } from "@mui/material";
import { InputsProps } from "./inputs";
import styles from "./input.module.scss";

export interface InputProp extends InputsProps {
  name: string;
  value: string | undefined;
  placeholder: string | undefined;
  variant?: "outlined" | "filled" | "standard";
}

/**
 * @category Components
 */
export default function TemplateInput({
  handleInputChange,
  name,
  value,
  placeholder,
  variant = "outlined",
}: InputProp) {
  return (
    <TextField
      className={styles.templateInput}
      name={name}
      onChange={handleInputChange}
      value={value}
      label={placeholder}
      variant={variant}
    />
  );
}
