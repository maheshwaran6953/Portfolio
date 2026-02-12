import './MainBar.css'
import { useState } from 'react';
import { About } from './About';
import { Resume } from './Resume';
import { Projects } from './Projects';
import { Contact } from './Contact';

export function Mainbar(){
    const [activeTab, setActiveTab] = useState('About');
    const NavbarItems = [
        { id: 'about', label: 'About', title: 'About Me' },
        { id: 'resume', label: 'Resume', title: 'My Resume' },
        { id: 'projects', label: 'Projects', title: 'My Projects' },
        { id: 'contact', label: 'Contact', title: 'Get In Touch' }
    ];
    const currentTab = NavbarItems.find(item => item.label === activeTab) || NavbarItems[0];
    const RenderContent = ()=>{
        const content = {
            'About' : <About />,
            'Resume' : <Resume />,
            'Projects': <Projects />,
            'Contact': <Contact />
        };
        return content[activeTab] || <About />;
    }
    return(
        <div className="mainbar">
            <nav className="navbar">
                <ul className="nav-list">
                    {NavbarItems.map((item) => (
                        <li className={`nav-item ${item.id} ${activeTab === item.label ? 'active' : ''}`} key={item.id}>
                            <button className={`navbar-link ${activeTab === item.label ? 'active' :'' }`} onClick={()=> setActiveTab(item.label)} >{item.label}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="page-title-section">
                <div className="container">
                    <h1 className="page-title">{currentTab.title}</h1>
                    <span className="underline"></span>
                </div>
            </div>
            <div className="mainbar-content">
                {
                    RenderContent()
                }
            </div>
        </div>
    );
}