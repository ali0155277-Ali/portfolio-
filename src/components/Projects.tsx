import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Project {
    title: string
    problem: string
    solution: string
    impact: string
    tags: string[]
    gradient: string
    emoji: string
    github?: string
    demo?: string
}

const projects: Project[] = [
    {
        title: 'Intelligent Demand Forecasting Engine',
        problem: 'Supply chain teams lacked real-time demand signals, causing $2M+ in excess inventory annually.',
        solution: 'Built an end-to-end ML pipeline using LSTMs and XGBoost ensemble with automated feature engineering and MLflow tracking.',
        impact: '↓ 34% inventory waste | ↑ 22% fulfillment accuracy | Deployed to 3 continents',
        tags: ['Python', 'TensorFlow', 'XGBoost', 'MLflow', 'AWS', 'Spark'],
        gradient: 'from-purple-500/20 to-indigo-500/10',
        emoji: '📦',
        github: '#',
        demo: '#',
    },
    {
        title: 'Real-Time Fraud Detection System',
        problem: 'A fintech startup was losing $500K/month to undetected fraudulent transactions.',
        solution: 'Designed a streaming anomaly detection system using Graph Neural Networks, processing 50K events/sec via Kafka.',
        impact: '↓ 91% fraud rate | $480K/mo savings | 99.97% uptime | <8ms latency',
        tags: ['Python', 'Kafka', 'PyTorch', 'Graph ML', 'Docker', 'Redis'],
        gradient: 'from-indigo-500/20 to-purple-500/10',
        emoji: '🛡️',
        github: '#',
        demo: '#',
    },
    {
        title: 'Executive AI Dashboard Platform',
        problem: 'C-suite executives spent 6+ hours weekly manually compiling KPI reports from fragmented data sources.',
        solution: 'Created a unified BI platform with NLP-powered natural language querying and automated insight generation.',
        impact: '↓ 85% reporting time | Adopted by 50+ executives | $200K annual savings',
        tags: ['TypeScript', 'React', 'Power BI API', 'OpenAI', 'Azure', 'PostgreSQL'],
        gradient: 'from-fuchsia-500/20 to-purple-500/10',
        emoji: '📊',
        github: '#',
        demo: '#',
    },
    {
        title: 'Multilingual NLP Research Pipeline',
        problem: 'Research teams couldn\'t efficiently process and extract insights from 1M+ multi-language scientific documents.',
        solution: 'Developed a distributed NLP pipeline with fine-tuned multilingual BERT, custom entity extraction, and semantic search.',
        impact: '40+ languages | 3x faster research cycles | 95.2% entity accuracy',
        tags: ['Python', 'Hugging Face', 'BERT', 'Elasticsearch', 'FastAPI', 'Kubernetes'],
        gradient: 'from-orange-500/20 to-rose-500/10',
        emoji: '🌐',
        github: '#',
        demo: '#',
    },
]

const Projects: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length)
    }

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }

    return (
        <section id="projects" className="py-24 relative overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono theme-label tracking-[0.3em] uppercase mb-3 block transition-colors duration-500">
                        Case Studies
                    </span>
                    <h2 className="section-heading mb-4">Featured Projects</h2>
                    <p className="theme-text-secondary max-w-xl mx-auto transition-colors duration-500">
                        Real-world AI systems built for scale, precision, and measurable business impact.
                    </p>
                </motion.div>

                {/* 3D Card Fan Carousel */}
                <div className="relative h-[650px] md:h-[550px] flex items-center justify-center perspective-[1200px]">
                    {projects.map((project, i) => {
                        const isCenter = i === activeIndex
                        
                        // Calculate offset for Fan Array
                        let offset = i - activeIndex
                        if (offset > projects.length / 2) offset -= projects.length
                        if (offset < -projects.length / 2) offset += projects.length

                        // Physics configuration based on distance from center
                        const rotateY = offset * -25
                        const translateZ = Math.abs(offset) * -150
                        const translateX = offset * 60
                        
                        // Only show proximal items for cleaner view
                        const isVisible = Math.abs(offset) <= 2

                        return (
                            <motion.div
                                key={project.title}
                                animate={{
                                    rotateY: rotateY,
                                    z: translateZ,
                                    x: `${translateX}%`,
                                    scale: isCenter ? 1 : 0.85,
                                    opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                                    zIndex: projects.length - Math.abs(offset)
                                }}
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                className={`absolute inset-x-0 mx-auto w-full max-w-[480px] min-w-0 origin-center ${!isCenter ? 'pointer-events-none cursor-pointer' : 'cursor-default'}`}
                                onClick={() => !isCenter && setActiveIndex(i)}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className={`premium-card relative theme-surface rounded-2xl overflow-hidden group border transition-all duration-500 ${isCenter ? '' : 'border-slate-300 dark:border-white/10'}`}>
                                    {/* Gradient bg */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} ${isCenter ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />

                                    <div className="relative p-4 sm:p-8 h-full flex flex-col justify-between" style={{ minHeight: '440px' }}>
                                        {/* Top row */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                                <div className="shrink-0 text-4xl sm:text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{project.emoji}</div>
                                                <div className="min-w-0">
                                                    <h3 className="break-words text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-2 shrink-0">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        className="w-10 h-10 rounded-xl glass flex items-center justify-center theme-text-muted hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all pointer-events-auto"
                                                        aria-label="GitHub"
                                                    >
                                                        <FiGithub size={18} />
                                                    </a>
                                                )}
                                                {project.demo && (
                                                    <a
                                                        href={project.demo}
                                                        className="w-10 h-10 rounded-xl glass flex items-center justify-center theme-text-muted hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all pointer-events-auto"
                                                        aria-label="Live Demo"
                                                    >
                                                        <FiExternalLink size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Labels */}
                                        <div className="space-y-4 mb-6 flex-grow">
                                            {[
                                                { label: 'Problem', text: project.problem, color: 'text-rose-800 dark:text-rose-400' },
                                                { label: 'Solution', text: project.solution, color: 'text-purple-800 dark:text-purple-400' },
                                            ].map(({ label, text, color }) => (
                                                <div key={label}>
                                                    <span className={`text-xs font-mono font-bold ${color} tracking-widest uppercase`}>
                                                        {label}
                                                    </span>
                                                    <p className="text-sm theme-text-secondary mt-1.5 leading-relaxed">{text}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Impact */}
                                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-700/30 dark:border-green-500/20 mb-6">
                                            <span className="text-xs font-mono text-green-800 dark:text-green-400 tracking-widest uppercase block mb-1">
                                                Impact
                                            </span>
                                            <p className="text-sm text-green-800 dark:text-green-300 font-semibold">{project.impact}</p>
                                        </div>

                                        {/* Tech badges */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="tech-badge">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-6 mt-8">
                    <button
                        onClick={prevCard}
                        className="w-12 h-12 rounded-full glass-dark flex items-center justify-center theme-text-secondary hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-purple-700 dark:bg-purple-500 w-6 shadow-[0_0_8px_rgba(168,85,247,1)]' : 'bg-slate-400 dark:bg-gray-600'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextCard}
                        className="w-12 h-12 rounded-full glass-dark flex items-center justify-center theme-text-secondary hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Projects
