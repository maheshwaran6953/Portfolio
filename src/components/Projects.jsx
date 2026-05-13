// Projects.jsx
import { useState } from 'react';
import './Projects.css';
import { Project } from './ProjectData';

export function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectActive, setSelectActive] = useState(false);

    const categories = ['All', 'FinTech', 'Full Stack', 'Web Development', 'Applications'];

    const filteredProjects = activeFilter === 'All' 
        ? Project 
        : Project.filter(p => p.category === activeFilter);

    return (
        <article className="portfolio active" data-page="portfolio">
            <header>
                <h1 className="h2 article-title">Projects</h1>
            </header>

            <section className="projects">
                {/* Desktop Filter List */}
                <ul className="filter-list">
                    {categories.map(category => (
                        <li className="filter-item" key={category}>
                            <button 
                                className={activeFilter === category ? 'active' : ''} 
                                onClick={() => setActiveFilter(category)}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Filter Select Box */}
                <div className="filter-select-box">
                    <button 
                        className={`filter-select ${selectActive ? 'active' : ''}`} 
                        onClick={() => setSelectActive(!selectActive)}
                    >
                        <div className="select-value">{activeFilter}</div>
                        <div className="select-icon">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.75 5.625L7.5 9.375L11.25 5.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </button>

                    <ul className="select-list">
                        {categories.map(category => (
                            <li className="select-item" key={category}>
                                <button onClick={() => {
                                    setActiveFilter(category);
                                    setSelectActive(false);
                                }}>
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className="project-list">
                    {filteredProjects.map((project) => (
                        <li 
                            className="project-item active" 
                            key={project.id}
                        >
                            <div className="project-card">
                                <figure className="project-img">
                                    <div className="project-item-icon-box">
                                        {/* GitHub Link */}
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-icon-link" title="View Code">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </a>
                                        {/* Live Demo Link */}
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-icon-link" title="Live Demo">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    </div>
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                </figure>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-category">{project.category}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}