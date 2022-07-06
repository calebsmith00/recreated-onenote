import type { NextPage } from "next";
import TemplateCreation from "../components/template_creation";

/**
 * Endpoint: /create-template
 * @category Pages
 */
const CreateTemplatePage: NextPage = () => {
  return <TemplateCreation />;
};

export default CreateTemplatePage;
