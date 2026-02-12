import './ResumeSkills.css'

export function ResumeSkills(){
    return (
        <div className="resume-skills-section">
            <h3 className="h3 skills-title">My skills</h3>
            <ul className="skill-list">
                <li className="skill-item">
                    <div className='title-wrapper'>
                        <h5 className='h5'>React</h5>
                        <data value="80">80%</data>
                    </div>
                    <div className="skill-progress">
                        <div className="skill-fill react-skill"></div>
                    </div>
                </li>
                <li className="skill-item">
                    <div className='title-wrapper'>
                        <h5 className='h5'>Backend</h5>
                        <data value="80">60%</data>
                    </div>
                    <div className="skill-progress">
                        <div className="skill-fill backend-skill"></div>
                    </div>
                </li>
                <li className="skill-item">
                    <div className='title-wrapper'>
                        <h5 className='h5'>Java</h5>
                        <data value="80">70%</data>
                    </div>
                    <div className="skill-progress">
                        <div className="skill-fill java-skill"></div>
                    </div>
                </li>
                <li className="skill-item">
                    <div className='title-wrapper'>
                        <h5 className='h5'>Database SQL</h5>
                        <data value="80">50%</data>
                    </div>
                    <div className="skill-progress">
                        <div className="skill-fill database"></div>
                    </div>
                </li>
            </ul>
        </div>
    );
}