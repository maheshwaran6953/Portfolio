// projectData.js
import amazonImg from '../assets/Amazon.png';
import Todo from '../assets/Todo.png';
import aiVoiceDetectorImg from '../assets/Api.png';
import StonePaperScissor from '../assets/StonePaperScissor.png';

export const Project     = [
    {
        id: 1,
        title: "Amazon Clone",
        description: "A fully functional e-commerce platform with cart and payment integration",
        image: amazonImg,
        link: "https://amazon-project.com",
        tech: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
        id: 2,
        title: "Todo Application",
        description: "A clean and intuitive todo list app that helps users organize daily tasks. Features include add, edit, delete, and mark complete - all persisted in browser's local storage.",
        image: Todo,
        link: "https://maheshwaran6953.github.io/TODO_PROJECT/index.html",
        tech: ["JavaScript", "CSS3", "HTML5"]
    },
    {
        id: 3,
        title: "AI Voice Detector",
        description: "A Python-based API that analyzes audio files to determine whether a voice recording is human or AI-generated. Built with machine learning techniques to detect synthetic speech patterns.",
        image: aiVoiceDetectorImg,
        link: "https://github.com/maheshwaran6953/voice-detection-hackathon",
        tech: ["Python", "Flask/FastAPI", "Machine Learning", "Librosa", "Audio Processing"]
    },
    {
        id: 4,
        title: "Stone Paper Scissors",
        description: "Classic hand game built with vanilla JavaScript. Play against the computer with real-time score tracking and persistent leaderboard using local storage.",
        image: StonePaperScissor,
        link: "https://maheshwaran6953.github.io/stone-paper-scissors/",
        tech: ["JavaScript", "HTML5", "CSS3", "Local Storage"]
    }
];