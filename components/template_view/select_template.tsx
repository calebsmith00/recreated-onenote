/**
 * @packageDocumentation
 * @module SelectTemplate
 */

import { useEffect, useState } from "react";
import TemplateTrainingTable from "./template_training_table";

export type SelectTemplateProps = {
  templates: any;
};

/**
 * @category Components
 */
export default function SelectTemplate({ templates }: SelectTemplateProps) {
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (templates.length < 1) return;
    setLoaded(true);
  }, [templates]);

  return loaded ? (
    <>
      {templates.map((template: any) => (
        <p
          style={{
            width: "50%",
            margin: "auto",
            textAlign: "center",
            fontFamily: "Arial",
            fontSize: "18px",
            lineHeight: "2",
          }}
          key={template.id}
          onClick={() => setSelectedTemplate(template)}
        >
          Template Name: {template.title}
        </p>
      ))}

      <TemplateTrainingTable template={selectedTemplate} />
    </>
  ) : (
    <>
      <p
        style={{
          width: "50%",
          margin: "auto",
          textAlign: "center",
          fontFamily: "Arial",
          fontSize: "18px",
        }}
      >
        Loading your templates, this might take a few minutes.
      </p>
    </>
  );
}
