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
                    I'm a motivated <strong>Full-Stack Developer</strong> and B.Tech IT student from Tamil Nadu, India, 
                    with hands-on experience in building enterprise-grade web applications. I specialize 
                    in turning complex requirements into scalable, high-performance solutions with a 
                    strong focus on clean architecture and user-centric design.
                </p>
                <p>
                    My experience ranges from developing an AI-powered helpdesk for Smart India Hackathon 2025 
                    to delivering a live college task management platform handling <strong>1000+ users</strong>. 
                    Whether it's architecting complex backend systems with Node.js and MongoDB or crafting 
                    dynamic frontends with React and Angular, I bring a personal touch to every project, 
                    ensuring performance and seamless user experiences.
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
                                    {typeof IconComponent === 'function' || (typeof IconComponent === 'object' && IconComponent !== null) ? (
                                        <IconComponent size={40} strokeWidth={1.5} color="var(--orange-yellow-crayola)" />
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