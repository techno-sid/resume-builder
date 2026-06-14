import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Plus, FileText, Trash2 } from 'lucide-react'

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      // Get saved resume IDs from localStorage
      const savedIds = JSON.parse(localStorage.getItem('my_resumes') || '[]');
      
      if (savedIds.length === 0) {
        setResumes([]);
        setIsLoading(false);
        return;
      }

      // Fetch only the resumes that belong to this browser
      const { data, error } = await supabase
        .from('resumes')
        .select('id, title, updated_at')
        .in('id', savedIds)
        .order('updated_at', { ascending: false });
        
      if (error) throw error;
      
      // Clean up localStorage if some resumes were deleted from the server
      if (data && data.length !== savedIds.length) {
        const validIds = data.map(r => r.id);
        localStorage.setItem('my_resumes', JSON.stringify(validIds));
      }
      
      setResumes(data || []);
    } catch (error) {
      console.error('Error fetching resumes:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResume = async (id, e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
    try {
      // Optimistic UI update
      setResumes(resumes.filter(r => r.id !== id));
      
      // Update localStorage
      const savedIds = JSON.parse(localStorage.getItem('my_resumes') || '[]');
      localStorage.setItem('my_resumes', JSON.stringify(savedIds.filter(savedId => savedId !== id)));

      // Delete from server
      await supabase.from('resumes').delete().eq('id', id);
    } catch (error) {
      console.error('Error deleting:', error.message);
    }
  };

  return (
    <div className="app-container" style={{backgroundColor: 'var(--bg-light)'}}>
      <header className="app-header">
        <div className="header-content">
          <h1>My Resumes</h1>
        </div>
      </header>
      
      <main className="dashboard-main" style={{maxWidth: '1000px', margin: '2rem auto', width: '100%', padding: '0 2rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem'}}>
          
          <Link to="/builder/new" style={{textDecoration: 'none'}}>
            <div style={{
              border: '2px dashed var(--primary-blue)', 
              borderRadius: '8px', 
              height: '200px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 86, 179, 0.05)',
              color: 'var(--primary-blue)',
              transition: 'all 0.2s'
            }} className="new-resume-card">
              <Plus size={48} style={{marginBottom: '1rem'}} />
              <h3>Create New</h3>
            </div>
          </Link>

          {isLoading ? <p>Loading...</p> : resumes.map(resume => (
            <Link key={resume.id} to={`/builder/${resume.id}`} style={{textDecoration: 'none'}}>
              <div style={{
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                height: '200px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative'
              }} className="resume-card">
                <div>
                  <FileText size={32} color="var(--primary-blue)" style={{marginBottom: '1rem'}} />
                  <h3 style={{color: 'var(--text-dark)', marginBottom: '0.5rem', fontSize: '1.2rem'}}>{resume.title}</h3>
                  <p style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>
                    Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <button 
                  onClick={(e) => deleteResume(resume.id, e)}
                  style={{
                    position: 'absolute', top: '1rem', right: '1rem', 
                    background: 'none', color: '#dc3545', padding: '0.5rem'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
