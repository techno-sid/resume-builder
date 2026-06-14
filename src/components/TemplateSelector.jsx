import { LayoutTemplate } from 'lucide-react';

export default function TemplateSelector({ selectedTemplate, onSelect }) {
  return (
    <div className="template-selector">
      <LayoutTemplate size={20} color="var(--primary-blue)" />
      <select 
        value={selectedTemplate} 
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="template1">Modern Clean (Template 1)</option>
        <option value="template2">Classic Professional (Template 2)</option>
      </select>
    </div>
  );
}
