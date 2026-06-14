import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Download, Save, Link as LinkIcon, ChevronLeft } from 'lucide-react'
import html2pdf from 'html2pdf.js'

import { supabase } from '../lib/supabaseClient'
import { defaultResumeData } from '../lib/defaultData'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'

export default function Builder() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [title, setTitle] = useState('My Resume');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(id && id !== 'new');

  useEffect(() => {
    if (id && id !== 'new') {
      loadResume(id);
    }
  }, [id]);

  const loadResume = async (resumeId) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single();
      
      if (error) throw error;
      if (data) {
        setResumeData(data.resume_data);
        setTitle(data.title || 'My Resume');
      }
    } catch (error) {
      console.error("Error loading resume:", error.message);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let currentId = id === 'new' ? undefined : id;
      
      const payload = {
        title: title,
        resume_data: resumeData,
        updated_at: new Date().toISOString()
      };

      if (currentId) {
        // Update existing
        const { error } = await supabase
          .from('resumes')
          .update(payload)
          .eq('id', currentId);
        if (error) throw error;
        alert("Resume updated successfully!");
      } else {
        // Create new
        const { data, error } = await supabase
          .from('resumes')
          .insert([payload])
          .select()
          .single();
          
        if (error) throw error;
        
        // Save ID to local storage so Dashboard knows we own it
        const savedIds = JSON.parse(localStorage.getItem('my_resumes') || '[]');
        savedIds.push(data.id);
        localStorage.setItem('my_resumes', JSON.stringify(savedIds));

        alert("New resume saved successfully!");
        navigate(`/builder/${data.id}`, { replace: true });
      }
    } catch (error) {
      console.error("Error saving resume:", error.message);
      alert("Error saving resume. Make sure you updated the Supabase table!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadClick = () => {
    const element = document.getElementById('resume-preview-container');
    const userName = resumeData.personalInfo.fullName.trim() || 'User';
    const opt = {
      margin:       0,
      filename:     `${userName} Resume.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const copyPublicLink = () => {
    if (id === 'new') {
      alert("Please save your resume first before sharing!");
      return;
    }
    const link = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(link);
    alert("Public link copied to clipboard!");
  };

  if (isLoading) {
    return <div style={{padding: '2rem', textAlign: 'center'}}>Loading resume...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content" style={{gap: '1rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', flex: 1}}>
            <Link to="/" style={{color: 'var(--text-light)', display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
              <ChevronLeft size={20} /> Dashboard
            </Link>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
              style={{
                fontSize: '1.25rem', fontWeight: 'bold', border: 'none', 
                borderBottom: '1px solid transparent', padding: '0.2rem',
                color: 'var(--primary-blue)', background: 'transparent'
              }}
              placeholder="Resume Title"
            />
          </div>

          <div className="header-actions">
            <TemplateSelector 
              selectedTemplate={selectedTemplate} 
              onSelect={setSelectedTemplate} 
            />
            
            <button className="download-btn" style={{backgroundColor: '#17a2b8'}} onClick={copyPublicLink}>
              <LinkIcon size={18} />
              Share Link
            </button>
            
            <button className="download-btn" style={{backgroundColor: '#28a745'}} onClick={handleSave} disabled={isSaving}>
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save to Cloud'}
            </button>
            
            <button className="download-btn" onClick={handleDownloadClick}>
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </section>
        
        <section className="preview-section">
          <div className="preview-wrapper">
            <div id="resume-preview-container" className="resume-document">
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
