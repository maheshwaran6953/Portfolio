// ProjectData.jsx
import vanguardImg from '../assets/project_vanguard.png';
import helpdeskImg from '../assets/project_helpdesk.png';
import todomoodImg from '../assets/project_todomood.png';
import amazonImg from '../assets/project_amazon.png';
import ragbotImg from '../assets/project_ragbot.png';

export const Project = [
    {
        id: 1,
        title: "Vanguard Settlement Engine",
        description: "An enterprise-grade, event-driven B2B liquidity platform using AI risk-scoring and Virtual Account (VAN) orchestration.",
        category: "FinTech",
        image: vanguardImg,
        link: "https://github.com/maheshwaran6953/vanguard-settlement-engine",
        tech: ["Python", "Node.js", "AI", "B2B"]
    },
    {
        id: 2,
        title: "Smart Helpdesk Ticketing",
        description: "Full-stack ITSM Helpdesk Ticketing System for efficient issue tracking and resolution.",
        category: "Full Stack",
        image: helpdeskImg,
        link: "https://github.com/maheshwaran6953/smart-helpdesk-ticketing",
        tech: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
        id: 3,
        title: "TodoMood",
        description: "AI-powered mood-adaptive task management app that organizes your day based on your emotions.",
        category: "Full Stack",
        image: todomoodImg,
        link: "https://github.com/maheshwaran6953/todomood",
        tech: ["React", "AI", "Local Storage"]
    },
    {
        id: 4,
        title: "Amazon Project",
        description: "A fully functional e-commerce platform clone with cart and payment integration.",
        category: "Web Development",
        image: amazonImg,
        link: "https://github.com/maheshwaran6953/Amazon-project",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 5,
        title: "RAG Chatbot Endee",
        description: "AI-powered Document Q&A chatbot using Endee vector database for highly accurate information retrieval.",
        category: "Applications",
        image: ragbotImg,
        link: "https://github.com/maheshwaran6953/rag-chatbot-endee",
        tech: ["Python", "AI", "Vector DB", "RAG"]
    }
];