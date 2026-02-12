import './Resume.css'
import { Education, Experience } from './Icons'
import { ResumeSkills } from './ResumeSkills';

export function Resume(){
    return(
        <div className="resume">
            <div className="education">
                <div className="heading">
                    <div className="icon">
                        <Education />
                    </div>
                    <div className="title-text">
                        <h3>Education</h3>
                    </div>
                </div>
                <div className="schooling-college-section">
                    <div className="line-follow"></div>
                    <div className="school-college">
                        <div className="school">
                            <h2 className='school-name'>Sri Vidhya Nikethan Matric Higher Secondary School</h2>
                            <p className='year'>2022 - 2023</p>
                            <p className='place'>Kangayam</p>
                        </div>
                        <div className="college">
                            <h2 className='college-name'>V.S.B Engineering College</h2>
                            <p className='mark'>CGPA : 8.2</p>
                            <p className='year'>2023 - 2027</p>
                            <p className='place'>Karur</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="education">
                <div className="heading">
                    <div className="icon">
                        <Experience />
                    </div>
                    <div className="title-text">
                        <h3>Experience</h3>
                    </div>
                </div>
                <div className="schooling-college-section">
                    <div className="line-follow-2"></div>
                    <div className="school-college">
                        <div className="school">
                            <h2 className='school-name'>Web Developer Intern — Infosys Springboard</h2>
                            <p className='year'>2025</p>
                            <p className='place'>Contributed to building and optimizing web applications, focusing on clean UI/UX and efficient code practices</p>
                        </div>
                        <div className="college college-2">
                            <h2 className='college-name'> College Projects</h2>
                            <p className='year'>2024 - 2025</p>
                            <p className='place'>Designed and deployed full‑stack apps with Angular, Node.js, and ServiceNow automation.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="resume-skill">
                <ResumeSkills />
            </div>
        </div>
    );
}