import './ResumeSkills.css'

export function ResumeSkills(){
    const skillCategories = [
        {
            title: "Frontend",
            skills: ["React.js", "Angular", "TypeScript", "Tailwind CSS", "Framer Motion"]
        },
        {
            title: "Backend",
            skills: ["Node.js", "Express.js", "MySQL", "MongoDB Atlas", "JWT", "REST API"]
        },
        {
            title: "AI / ML & Tools",
            skills: ["NLP", "Predictive Scoring", "Git", "Postman", "Playwright", "Vercel"]
        }
    ];

    return (
        <div className="resume-skills-section">
            <h3 className="h3 skills-title">Technical Skills</h3>
            
            <div className="skills-container">
                {skillCategories.map((category, idx) => (
                    <div className="skill-category" key={idx}>
                        <h4 className="h4 category-title">{category.title}</h4>
                        <ul className="skill-badge-list">
                            {category.skills.map((skill, sIdx) => (
                                <li className="skill-badge" key={sIdx}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <h3 className="h3 skills-title" style={{marginTop: '30px'}}>Proficiency</h3>
            <ul className="skill-list content-card">
                <li className="skill-item">
                    <div className='title-wrapper'>
                        <h5 className='h5'>Frontend Development</h5>
                        <data value="90">90%</data>
                    </div>
                    <div className="skill-progress-bg">
                        <div className="skill-progress-fill" style={{width: '90%'}}></div>
                    </div>
                </li>
                <li className="skill-item">
                    <div className='title-wrapper'>
                        <h5 className='h5'>Backend Development</h5>
                        <data value="85">85%</data>
                    </div>
                    <div className="skill-progress-bg">
                        <div className="skill-progress-fill" style={{width: '85%'}}></div>
                    </div>
                </li>
                <li className="skill-item">
                    <div className='title-wrapper'>
                        <h5 className='h5'>AI & Machine Learning</h5>
                        <data value="70">70%</data>
                    </div>
                    <div className="skill-progress-bg">
                        <div className="skill-progress-fill" style={{width: '70%'}}></div>
                    </div>
                </li>
            </ul>
        </div>
    );
}