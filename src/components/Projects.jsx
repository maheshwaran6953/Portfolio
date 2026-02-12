// Projects.jsx
import './Projects.css';
import { Project } from './ProjectData';

export function Projects() {
    return (
        <div className="projects-container">
            {Project.map((project) => (
                <a
                    key={project.id}
                    href={project.link}
                    className="project-card"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <figure>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="project-image"
                        />
                    </figure>
                    <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        {project.tech && (
                            <div className="project-tech">
                                {project.tech.map((tech, index) => (
                                    <span key={index} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </a>
            ))}
        </div>
    );
}