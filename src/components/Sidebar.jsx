import './Sidebar.css'
import MyAvatar from '../assets/my-avatar.png'
import { useState } from 'react';
import { EmailIcon, PhoneIcon, CalendarIcon, LocationIcon,          GitHubIcon, LinkedInIcon, InstagramIcon, LeetCodeIcon } from './Icons';

export function Sidebar(){
    const name = "Maheshwaran P";
    const [hoveredLetter, setHoveredLetter] = useState(null);
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
        <div className='sidebar'>
            <div className="sidebar-info">

                {/* avatar */}

                <figure className='avatar-image'>
                    <img src={MyAvatar} alt="my-avatar" />
                </figure>

                {/* details */}

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
                </div>
                <div className="seperator"></div>
            </div>
            <div className="contact-info">
                <ul>
                    {ContactInfo.map((item, index) => (
                        <li className={item.type} key={index}>
                            <div className="contact-logo">
                                <item.icon />
                            </div>
                            <div className="contact-detail">
                                <p className='contact-title'>{item.title}</p>
                                {item.link ? (
                                    <a href={item.link} rel="noopener noreferrer" data-full-email={item.content}
                                    title={item.content}>
                                    {item.type === 'email' ?
                                        `${item.content.substring(0, 15)}...` :
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
            <div className="social-media">
                <ul className='socila-list'>
                    {SocialLinks.map((social, index) => (
                        <li className="social-item"key={index} >
                            <a href={social.url} target='_blank'  rel="noopener noreferrer">
                                <social.icon />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}