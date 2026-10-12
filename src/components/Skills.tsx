import React from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import {
    SiPython, SiJavascript, SiDart,
    SiTensorflow, SiPytorch, SiScikitlearn,
    SiDocker, SiKubernetes, SiGit, SiApachespark,
    SiFlutter, SiCplusplus, SiReact,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import { FaDatabase, FaChartBar, FaRobot, FaCloud } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import type { IconType } from 'react-icons/lib'

interface Skill {
    name: string
    icon: IconType
    level: number
}

interface Category {
    title: string
    color: string
    glow: string
    skills: Skill[]
}

const categories: Category[] = [
    {
        title: 'Programming',
        color: 'from-blue-700 to-cyan-700 dark:from-blue-500 dark:to-cyan-500',
        glow: 'hover:shadow-glow-blue',
        skills: [
            { name: 'Python', icon: SiPython, level: 95 },
            { name: 'C++', icon: SiCplusplus, level: 80 },
            { name: 'JavaScript', icon: SiJavascript, level: 82 },
            { name: 'SQL', icon: FaDatabase, level: 90 },
            { name: 'Dart', icon: SiDart, level: 85 },
        ],
    },
    {
        title: 'AI & Machine Learning',
        color: 'from-indigo-700 to-purple-700 dark:from-indigo-500 dark:to-purple-500',
        glow: 'hover:shadow-glow-indigo',
        skills: [
            { name: 'TensorFlow', icon: SiTensorflow, level: 88 },
            { name: 'PyTorch', icon: SiPytorch, level: 85 },
            { name: 'Scikit-Learn', icon: SiScikitlearn, level: 90 },
            { name: 'OpenAI APIs', icon: FaRobot, level: 87 },
         ],
    },
    {
        title: 'BI & Analytics',
        color: 'from-cyan-700 to-teal-700 dark:from-cyan-500 dark:to-teal-500',
        glow: 'hover:shadow-glow-cyan',
        skills: [
            { name: 'Excel', icon: FaChartBar, level: 85 },
            { name: 'Tableau', icon: FaChartBar, level: 85 },
            { name: 'Power BI', icon: FaChartBar, level: 88 },
            { name: 'Google Analytics', icon: FaChartBar, level: 80 },
            { name: 'Data Visualization', icon: BsGraphUp, level: 90 },
        ],
    },
    {
        title: 'Tools & Engineering',
        color: 'from-orange-700 to-pink-700 dark:from-orange-500 dark:to-pink-500',
        glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]',
        skills: [
            { name: 'Docker', icon: SiDocker, level: 82 },
            { name: 'Kubernetes', icon: SiKubernetes, level: 70 },
            { name: 'Apache Spark', icon: SiApachespark, level: 78 },
            { name: 'AWS', icon: FaCloud, level: 80 },
            { name: 'Azure', icon: VscAzure, level: 75 },
            { name: 'Git', icon: SiGit, level: 92 },
        ],
    },
    {
        title: 'Mobile App Development',
        color: 'from-green-700 to-cyan-700 dark:from-green-500 dark:to-cyan-500',
        glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]',
        skills: [
            { name: 'Flutter', icon: SiFlutter, level: 70 },
            { name: 'React Native', icon: SiReact, level: 60 },
            { name: 'Dart', icon: SiDart, level: 85 },
        ],
    },
]

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const Skills: React.FC = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="skills" className="py-24 relative overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono theme-label tracking-[0.3em] uppercase mb-3 block transition-colors duration-500">
                        Capabilities
                    </span>
                    <h2 className="section-heading mb-4">Technical Skills</h2>
                    <p className="theme-text-secondary max-w-xl mx-auto transition-colors duration-500">
                        A precision toolkit built for real-world AI pipelines, advanced analytics, and production data systems.
                    </p>
                </motion.div>

                {/* Skill categories */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6"
                >
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.title}
                            variants={itemVariants}
                            className={`card group ${cat.glow} glass transition-all duration-300`}
                        >
                            {/* Gradient top bar */}
                            <div className={`h-1 rounded-full bg-gradient-to-r ${cat.color} mb-5 group-hover:shadow-sm transition-all duration-300`} />

                            <h3 className="text-base font-semibold theme-text-primary mb-5 transition-colors duration-500">{cat.title}</h3>

                            <div className="space-y-4">
                                {cat.skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <skill.icon className="theme-text-muted text-sm transition-colors duration-500" />
                                                <span className="text-sm theme-text-secondary transition-colors duration-500">{skill.name}</span>
                                            </div>
                                            <span className="text-xs theme-text-muted font-mono transition-colors duration-500">{skill.level}%</span>
                                        </div>
                                        {/* Skill bar */}
                                        <div className="h-1.5 rounded-full bg-slate-500 dark:bg-slate-500 overflow-hidden transition-colors duration-500">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
