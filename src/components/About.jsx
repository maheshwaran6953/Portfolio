import './About.css'
import { ServicesData } from './Services';

export function About(){
    return(
        <div className="about">
            <div className="about-content">
                <p>
                I'm a Full-Stack Developer and UI/UX Enthusiast from Tamil Nadu, India, specializing in building scalable and user-friendly web applications. I enjoy turning complex problems into simple, efficient, and intuitive solutions.
                </p>
                <br />
                <p>
                My job is to design and develop applications that are not only functional and reproducible but also visually appealing and easy to use. I add a personal touch to every project, ensuring clarity, performance, and a seamless user experience. My aim is to bring your ideas to life in the most practical and creative way. I’ve built and optimized projects ranging from task management apps to interactive platforms.
                </p>
            </div>
            <section className="services">
                <h2 className="service-title">What i'm doing</h2>
                <ul className="service-list">
                {ServicesData.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <li className="service-item" key={index}>
                                <div className="service-icon">
                                    {typeof IconComponent === 'function' ? (
                                        <IconComponent size={88} />
                                    ) : (
                                        <img src={IconComponent} alt={service.title} />
                                    )}
                                </div>
                                <div className="service-content">
                                    <h3 className="service-name">{service.title}</h3>
                                    <p className="service-text">{service.text}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}