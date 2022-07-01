import { useEffect, useState } from "react";
import TemplateTrainingTable from "./template_training_table";

type SelectTemplateProps = {
  templates: any;
};

export default function SelectTemplate({ templates }: SelectTemplateProps) {
  const [selectedTemplate, setSelectedTemplate] = useState();
  useEffect(() => {}, [templates]);

  return (
    <>
      {templates.map((template: any) => (
        <p key={template.id} onClick={() => setSelectedTemplate(template)}>
          {template.title}
        </p>
      ))}

      <TemplateTrainingTable template={selectedTemplate} />
    </>
  );
}
