import { TextField } from "@mui/material";
import { InputsProps } from "./inputs";
interface InputProp extends InputsProps {
  name: string;
  value: string | undefined;
}

export default function TemplateInput({
  handleInputChange,
  name,
  value,
}: InputProp) {
  return <TextField name={name} onChange={handleInputChange} value={value} />;
}
