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
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <figure className="project-img">
                                    <div className="project-item-icon-box">
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </div>
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                </figure>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-category">{project.category}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}