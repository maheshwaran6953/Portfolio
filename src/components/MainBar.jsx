import './MainBar.css'
import { useState } from 'react';
import { About } from './About';
import { Resume } from './Resume';
import { Projects } from './Projects';
import { Blog } from './Blog';
import { Contact } from './Contact';

export function Mainbar(){
    const [activeTab, setActiveTab] = useState('About');
    const NavbarItems = [
        { id: 'about', label: 'About', title: 'About Me' },
        { id: 'resume', label: 'Resume', title: 'My Resume' },
        { id: 'projects', label: 'Projects', title: 'My Projects' },
        { id: 'blog', label: 'Blog', title: 'My Blog' },
        { id: 'contact', label: 'Contact', title: 'Get In Touch' }
    ];
    const currentTab = NavbarItems.find(item => item.label === activeTab) || NavbarItems[0];
    const RenderContent = ()=>{
        const content = {
            'About' : <About />,
            'Resume' : <Resume />,
            'Projects': <Projects />,
            'Blog': <Blog />,
            'Contact': <Contact />
        };
        return content[activeTab] || <About />;
    }
    return(
        <div className="mainbar">
            <nav className="navbar">
                <ul className="navbar-list">
                    {NavbarItems.map((item) => (
                        <li className="navbar-item" key={item.id}>
                            <button
                                className={`navbar-link ${activeTab === item.label ? 'active' : ''}`}
                                onClick={() => setActiveTab(item.label)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mainbar-content">
                {RenderContent()}
            </div>
        </div>
    );
}