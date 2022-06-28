import { ChangeEventHandler } from "react";
import TemplateInput from "./input";
import { FormData } from "./form";

export interface InputsProps {
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  templateEntry: FormData;
}

export default function TemplateInputs({
  handleInputChange,
  templateEntry,
}: InputsProps) {
  return (
    <>
      <TemplateInput
        handleInputChange={handleInputChange}
        name="templateName"
        placeholder="Name of Template"
        value={templateEntry.templateName}
        templateEntry={templateEntry}
      />
      <TemplateInput
        handleInputChange={handleInputChange}
        name="templateMentor"
        placeholder="Mentor"
        value={templateEntry.templateMentor}
        templateEntry={templateEntry}
      />
    </>
  );
}
