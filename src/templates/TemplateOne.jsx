import './TemplateOne.css';

export default function TemplateOne({ data }) {
  const { personalInfo, summary, experience, education, skills } = data;
  
  const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s !== '');

  return (
    <div className="template-one">
      <header className="t1-header">
        <h1>{personalInfo.fullName}</h1>
        <h2>{personalInfo.jobTitle}</h2>
        <div className="t1-contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      <main className="t1-main">
        {summary && (
          <section className="t1-section">
            <h3>Professional Summary</h3>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="t1-section">
            <h3>Experience</h3>
            <div className="t1-items">
              {experience.map(exp => (
                <div key={exp.id} className="t1-item">
                  <div className="t1-item-header">
                    <h4>{exp.title} <span className="t1-company">at {exp.company}</span></h4>
                    <span className="t1-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="t1-section">
            <h3>Education</h3>
            <div className="t1-items">
              {education.map(edu => (
                <div key={edu.id} className="t1-item">
                  <div className="t1-item-header">
                    <h4>{edu.degree}</h4>
                    <span className="t1-date">{edu.graduationDate}</span>
                  </div>
                  <div className="t1-school">{edu.school}, {edu.location}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skillsArray.length > 0 && (
          <section className="t1-section">
            <h3>Skills</h3>
            <div className="t1-skills">
              {skillsArray.map((skill, index) => (
                <span key={index} className="t1-skill-badge">{skill}</span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
