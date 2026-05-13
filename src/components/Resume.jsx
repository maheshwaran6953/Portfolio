import './Resume.css'
import { Education, Experience } from './Icons'
import { ResumeSkills } from './ResumeSkills';

export function Resume(){
    return(
        <article className="resume active" data-page="resume">
            <header>
                <h1 className="h2 article-title">Resume</h1>
            </header>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <Experience />
                    </div>
                    <h3 className="h3">Experience</h3>
                </div>

                <ol className="timeline-list">
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Angular Intern</h4>
                        <span>Aug 2025 — Oct 2025</span>
                        <p className="timeline-text">
                            Infosys Springboard (Remote)
                        </p>
                        <ul className="timeline-details">
                            <li>Developed Angular standalone components and improved productivity tools using CDK Drag-and-Drop.</li>
                            <li>Engineered a Kanban board with persistent task arrangement and beginner-friendly onboarding documentation.</li>
                        </ul>
                    </li>
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <Education />
                    </div>
                    <h3 className="h3">Education</h3>
                </div>

                <ol className="timeline-list">
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Bachelor of Technology in Information Technology</h4>
                        <span>2023 — 2027 (Expected)</span>
                        <p className="timeline-text">
                            VSB Engineering College, Tamil Nadu | CGPA: 8.2
                        </p>
                    </li>

                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">12th Standard — HSC</h4>
                        <span>2023</span>
                        <p className="timeline-text">
                            Sri Vidhya Nikethan Matric Higher Secondary School, Kangayam | 80.5%
                        </p>
                    </li>
                </ol>
            </section>

            <div className="resume-skill">
                <ResumeSkills />
            </div>

            <div className="resume-footer" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px'}}>
                <section className="certifications">
                    <h3 className="h3" style={{marginBottom: '20px'}}>Certifications</h3>
                    <ul className="timeline-details" style={{listStyle: 'none', paddingLeft: 0}}>
                        <li style={{marginBottom: '10px'}}>
                            <strong style={{color: 'var(--white-2)'}}>Infosys Springboard</strong> — Angular Development
                        </li>
                        <li>
                            <strong style={{color: 'var(--white-2)'}}>NPTEL</strong> — Java (68%)
                        </li>
                    </ul>
                </section>

                <section className="languages">
                    <h3 className="h3" style={{marginBottom: '20px'}}>Languages</h3>
                    <ul className="timeline-details" style={{listStyle: 'none', paddingLeft: 0}}>
                        <li style={{marginBottom: '10px'}}>
                            <strong style={{color: 'var(--white-2)'}}>Tamil</strong> (Native)
                        </li>
                        <li style={{marginBottom: '10px'}}>
                            <strong style={{color: 'var(--white-2)'}}>English</strong> (Fluent)
                        </li>
                        <li>
                            <strong style={{color: 'var(--white-2)'}}>Kannada</strong> (Conversational)
                        </li>
                    </ul>
                </section>
            </div>
        </article>
    );
}