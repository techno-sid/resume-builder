import './TemplateTwo.css';

export default function TemplateTwo({ data }) {
  const { personalInfo, summary, experience, education, skills } = data;
  
  const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s !== '');

  return (
    <div className="template-two">
      <aside className="t2-sidebar">
        <div className="t2-sidebar-content">
          <h1 className="t2-name">{personalInfo.fullName}</h1>
          <h2 className="t2-title">{personalInfo.jobTitle}</h2>
          
          <div className="t2-contact">
            <h3>Contact</h3>
            {personalInfo.email && <div className="t2-contact-item">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="t2-contact-item">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="t2-contact-item">{personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="t2-contact-item">{personalInfo.linkedin}</div>}
          </div>

          {skillsArray.length > 0 && (
            <div className="t2-skills">
              <h3>Skills</h3>
              <ul>
                {skillsArray.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      <main className="t2-main">
        {summary && (
          <section className="t2-section">
            <h3>Profile</h3>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="t2-section">
            <h3>Experience</h3>
            <div className="t2-items">
              {experience.map(exp => (
                <div key={exp.id} className="t2-item">
                  <div className="t2-item-header">
                    <div className="t2-item-title">
                      <h4>{exp.title}</h4>
                      <span className="t2-company">{exp.company}</span>
                    </div>
                    <span className="t2-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="t2-section">
            <h3>Education</h3>
            <div className="t2-items">
              {education.map(edu => (
                <div key={edu.id} className="t2-item">
                  <div className="t2-item-header">
                    <div className="t2-item-title">
                      <h4>{edu.degree}</h4>
                      <span className="t2-school">{edu.school}, {edu.location}</span>
                    </div>
                    <span className="t2-date">{edu.graduationDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
