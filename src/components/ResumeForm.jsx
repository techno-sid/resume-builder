import { Plus, Trash2 } from 'lucide-react';

export default function ResumeForm({ data, onChange }) {
  const updatePersonalInfo = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const updateSummary = (value) => {
    onChange({ ...data, summary: value });
  };

  const updateSkills = (value) => {
    onChange({ ...data, skills: value });
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange({ ...data, experience: newExperience });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id: Date.now().toString(), title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  const removeExperience = (index) => {
    const newExperience = [...data.experience];
    newExperience.splice(index, 1);
    onChange({ ...data, experience: newExperience });
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange({ ...data, education: newEducation });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: Date.now().toString(), degree: '', school: '', location: '', graduationDate: '', description: '' }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...data.education];
    newEducation.splice(index, 1);
    onChange({ ...data, education: newEducation });
  };

  return (
    <div className="resume-form">
      {/* Personal Info */}
      <section>
        <div className="section-title">
          <h2>Personal Information</h2>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" value={data.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={data.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
          </div>
          <div className="form-group">
            <label>LinkedIn</label>
            <input type="text" value={data.personalInfo.linkedin} onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section>
        <div className="section-title">
          <h2>Professional Summary</h2>
        </div>
        <div className="form-group">
          <textarea rows={4} value={data.summary} onChange={(e) => updateSummary(e.target.value)} placeholder="A brief summary of your professional background..." />
        </div>
      </section>

      {/* Work Experience */}
      <section>
        <div className="section-title">
          <h2>Work Experience</h2>
        </div>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="item-card">
            <button className="remove-btn" onClick={() => removeExperience(index)} title="Remove Experience">
              <Trash2 size={16} />
            </button>
            <div className="form-row">
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" value={exp.title} onChange={(e) => updateExperience(index, 'title', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input type="text" value={exp.startDate} placeholder="e.g. Jan 2021" onChange={(e) => updateExperience(index, 'startDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="text" value={exp.endDate} placeholder="e.g. Present" onChange={(e) => updateExperience(index, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="form-group" style={{marginTop: '1rem'}}>
              <label>Description</label>
              <textarea rows={3} value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} />
            </div>
          </div>
        ))}
        <button className="add-btn" onClick={addExperience}>
          <Plus size={18} /> Add Experience
        </button>
      </section>

      {/* Education */}
      <section>
        <div className="section-title">
          <h2>Education</h2>
        </div>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="item-card">
            <button className="remove-btn" onClick={() => removeEducation(index)} title="Remove Education">
              <Trash2 size={16} />
            </button>
            <div className="form-row">
              <div className="form-group">
                <label>Degree</label>
                <input type="text" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} />
              </div>
              <div className="form-group">
                <label>School</label>
                <input type="text" value={edu.school} onChange={(e) => updateEducation(index, 'school', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Graduation Date</label>
                <input type="text" value={edu.graduationDate} placeholder="e.g. May 2018" onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" value={edu.location} onChange={(e) => updateEducation(index, 'location', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
        <button className="add-btn" onClick={addEducation}>
          <Plus size={18} /> Add Education
        </button>
      </section>

      {/* Skills */}
      <section>
        <div className="section-title">
          <h2>Skills</h2>
        </div>
        <div className="form-group">
          <label>Skills (Comma separated)</label>
          <textarea rows={3} value={data.skills} onChange={(e) => updateSkills(e.target.value)} placeholder="React, JavaScript, CSS..." />
        </div>
      </section>
    </div>
  );
}
