import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import ResumePreview from '../components/ResumePreview'

export default function PublicView() {
  const { id } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('resume_data')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setResumeData(data.resume_data);
      } catch (err) {
        console.error("Error fetching public resume:", err.message);
        setError("Resume not found or is set to private.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchResume();
  }, [id]);

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--secondary-blue)'}}>Loading...</div>;
  }

  if (error || !resumeData) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8d7da', color: '#721c24'}}>{error}</div>;
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: 'var(--secondary-blue)', display: 'flex', justifyContent: 'center', padding: '2rem'}}>
      <div className="preview-wrapper" style={{maxWidth: '8.5in', width: '100%'}}>
        <div className="resume-document">
          <ResumePreview data={resumeData} template="template1" />
        </div>
      </div>
    </div>
  );
}
