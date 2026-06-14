import TemplateOne from '../templates/TemplateOne';
import TemplateTwo from '../templates/TemplateTwo';

export default function ResumePreview({ data, template }) {
  if (template === 'template2') {
    return <TemplateTwo data={data} />;
  }
  
  return <TemplateOne data={data} />;
}
