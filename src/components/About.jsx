import './About.css'
import { ServicesData } from './Services';

export function About(){
    return(
        <article className="about active">
            <header>
                <h1 className="h2 article-title">About me</h1>
            </header>

            <section className="about-text">
                <p>
                    I'm a Full-Stack Developer and UI/UX Enthusiast from Tamil Nadu, India,
                    specializing in building scalable and user-friendly web applications. I enjoy
                    turning complex problems into simple, efficient, and intuitive solutions.
                </p>
                <p>
                    My job is to design and develop applications that are not only functional and
                    reproducible but also visually appealing and easy to use. I add a personal touch
                    to every project, ensuring clarity, performance, and a seamless user experience.
                    My aim is to bring your ideas to life in the most practical and creative way.
                    I've built and optimized projects ranging from task management apps to
                    interactive platforms.
                </p>
            </section>

            <section className="service">
                <h3 className="h3 service-title">What i'm doing</h3>
                <ul className="service-list">
                    {ServicesData.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <li className="service-item" key={index}>
                                <div className="service-icon-box">
                                    {typeof IconComponent === 'function' ? (
                                        <IconComponent size={40} />
                                    ) : (
                                        <img src={IconComponent} alt={service.title} width="40" />
                                    )}
                                </div>
                                <div className="service-content-box">
                                    <h4 className="h4 service-item-title">{service.title}</h4>
                                    <p className="service-item-text">{service.text}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </article>
    );
}