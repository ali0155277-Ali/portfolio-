import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import FullName from './FullName'

const skills = [
    "Python",
    "Machine Learning",
    "Power BI",
    "SQL",
    "TensorFlow",
    "Data Engineering"
];

const SkillTag: React.FC<{ skill: string; index: number }> = ({ skill, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.05 }}
            className="px-4 py-2 rounded-xl border border-slate-200/80 bg-slate-100/80 text-slate-800 backdrop-blur-md shadow-sm hover:bg-purple-100 hover:border-purple-300 hover:text-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 text-sm font-medium cursor-default dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-purple-500/10 dark:hover:border-purple-500/50 dark:hover:text-purple-300"
        >
            {skill}
        </motion.div>
    );
};

const About: React.FC = () => {
    // 3D Tilt Physics for Profile Card
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        x.set(mouseX / width - 0.5)
        y.set(mouseY / height - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <section id="about" className="py-24 relative z-10">
            {/* Subtle radial gradient background glow */}
            <div className="ambient-glow absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="section-heading inline-block mb-4">
                            Who I Am
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="accent-gradient-rule w-24 h-1.5 mx-auto rounded-full"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Side: Avatar Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative flex justify-center perspective-[1200px]"
                    >
                        <motion.div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            className="premium-card w-full max-w-[400px] min-w-0 theme-surface rounded-[2rem] p-6 sm:p-10 flex flex-col items-center justify-center border transition-colors duration-300 relative group"
                        >
                            {/* Interactive Inner Glows */}
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" style={{ transform: "translateZ(1px)" }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" style={{ transform: "translateZ(1px)" }} />

                            {/* Avatar */}
                            <div 
                                className="profile-image-frame w-44 h-44 rounded-full p-2 mb-6 transition-all duration-500"
                                style={{ transform: "translateZ(60px)" }}
                            >
                                <div                                 className="profile-image-mask w-full h-full rounded-full border-2 border-slate-500 dark:border-transparent transition-all duration-500 overflow-hidden relative bg-white dark:bg-slate-900">
                                    <motion.img
                                        src="/image.png"
                                        alt="Ali Gabriel Ali"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Glass reflection overlay on avatar */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center" style={{ transform: "translateZ(40px)" }}>
                                <h3 className="text-3xl font-extrabold tracking-tight mb-2">
                                    <FullName size="footer" />
                                </h3>
                                <p className="text-sm font-bold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-cyan-800 to-indigo-800 dark:from-purple-400 dark:via-cyan-400 dark:to-indigo-400 max-w-[200px] leading-snug mx-auto">
                                    AI Engineer &<br/>Data Analyst &<br/>Developer Mobile Applications
                                </p>
                            </div>
                            
                            {/* Decorative corner elements */}
                            <div className="absolute top-6 left-6" style={{ transform: "translateZ(30px)" }}>
                                <div className="w-2 h-2 rounded-full bg-purple-500/50 group-hover:bg-purple-400 group-hover:animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                            </div>
                            <div className="absolute bottom-6 right-6" style={{ transform: "translateZ(30px)" }}>
                                <div className="w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7"
                    >
                        <div className="space-y-6 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                            <p>
                                I am a results-driven AI Engineer and Data Analyst with over three years of hands-on experience in data engineering, machine learning, and business intelligence. My expertise lies in transforming raw, unstructured data into actionable strategic insights using Python, SQL, and advanced analytics frameworks.
                            </p>
                            <p>
                                Currently working remotely as a Data Engineer, I focus on large-scale sales data analysis, high-accuracy forecasting models, and executive-level dashboard solutions. My approach combines statistical rigor, technical precision, and business understanding to deliver solutions that drive measurable growth and smarter decision-making.
                            </p>
                        </div>

                        <div className="mt-10">
                            <h4 className="text-sm uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 mb-6">
                                Technical Stack
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <SkillTag key={index} skill={skill} index={index} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
