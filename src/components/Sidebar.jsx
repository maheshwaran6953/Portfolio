import './Sidebar.css'
import MyAvatar from '../assets/my-avatar.png'
import { useState } from 'react';
import { EmailIcon, PhoneIcon, CalendarIcon, LocationIcon, GitHubIcon, LinkedInIcon, InstagramIcon, LeetCodeIcon, ChevronDown } from './Icons';

export function Sidebar(){
    const name = "Maheshwaran P";
    const [hoveredLetter, setHoveredLetter] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const ContactInfo = [
        {
            type: 'email',
            title: 'E-MAIL',
            content: 'maheshwaranpalanisamy1@gmail.com',
            link: 'mailto:maheshwaranpalanisamy1@gmail.com',
            icon: EmailIcon
        },
        {
            type: 'phone',
            title: 'PHONE',
            content: '+91 9442736953',
            link: 'tel:+919442736953',
            icon: PhoneIcon
        },
        {
            type: 'birthday',
            title: 'BIRTH DAY',
            content: '23 November, 2005',
            dateTime: '2005-11-23',
            icon: CalendarIcon
        },
        {
            type: 'location',
            title: 'LOCATION',
            content: 'Tamilnadu, India',
            icon: LocationIcon
        }
    ];

    const SocialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/maheshwaran6953',
            icon: GitHubIcon
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/maheshwaran-palanisamy',
            icon: LinkedInIcon
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/im__maheshwaran?igsh=MXAxanN5aW83MHY2NQ==',
            icon: InstagramIcon
        },
        {
            name: 'LeetCode',
            url: 'https://leetcode.com/u/MAHESHWARAN_P/',
            icon: LeetCodeIcon
        }
    ];

    return(
        <div className={`sidebar ${isExpanded ? 'active' : ''}`}>
            <div className="sidebar-info">
                <figure className='avatar-image'>
                    <img src={MyAvatar} alt="my-avatar" />
                </figure>

                <div className="info-content">
                    <h1 className="animated-name" >{name.split('').map((letter, index) => (
                        <span
                            key={index}
                            className={`name-letter ${hoveredLetter === index ? 'letter-hovered' : ''}`}
                            onMouseEnter={() => setHoveredLetter(index)}
                            onMouseLeave={() => setHoveredLetter(null)}
                            data-letter={letter}
                        >
                        {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    ))}</h1>
                    <p className="title">Full Stack Developer</p>
                    
                    <div className="cv-btn-container">
                        <a 
                            href="https://drive.google.com/file/d/1KQ7vSK2Z_mJ1zvigFlBgpjLwhyZXLqwJ/view?usp=sharing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="download-cv-btn"
                        >
                            Download CV
                        </a>
                    </div>
                </div>

                <button className="info_more-btn" onClick={() => setIsExpanded(!isExpanded)}>
                    <span>Show Contacts</span>
                    <ChevronDown size={16} color="var(--orange-yellow-crayola)" />
                </button>
            </div>

            <div className="sidebar-info_more">
                <div className="seperator"></div>

                <div className="contact-info">
                    <ul className="contact-list">
                        {ContactInfo.map((item, index) => (
                            <li className="contact-item" key={index}>
                                <div className="contact-logo">
                                    <item.icon />
                                </div>
                                <div className="contact-detail">
                                    <p className='contact-title'>{item.title}</p>
                                    {item.link ? (
                                        <a href={item.link} rel="noopener noreferrer" className="contact-link">
                                            {item.type === 'email' ?
                                                (item.content.length > 20 ? `${item.content.substring(0, 18)}...` : item.content) :
                                                item.content
                                            }
                                        </a>
                                    ):
                                    item.dateTime ? (
                                        <time dateTime={item.dateTime}>{item.content}</time>
                                    ):
                                    (
                                        <address>{item.content}</address>
                                    )
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="seperator"></div>

                <div className="social-media">
                    <ul className='socila-list'>
                        {SocialLinks.map((social, index) => (
                            <li className="social-item" key={index} >
                                <a href={social.url} target='_blank'  rel="noopener noreferrer">
                                    <social.icon />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}