import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiArrowDown, FiExternalLink, FiMail } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import FullName from './FullName'

const Hero: React.FC = () => {
    const orbitDots: Array<{
        delay: number
        top?: string
        left?: string
        right?: string
        bottom?: string
    }> = [
        { delay: 0, top: '5%', left: '50%' },
        { delay: 0.3, top: '50%', right: '5%' },
        { delay: 0.6, bottom: '5%', left: '50%' },
        { delay: 0.9, top: '50%', left: '5%' },
    ]

    // 3D Tilt Physics
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
        <section
            id="home"
            className="relative flex min-h-[100dvh] w-full max-w-full flex-col items-center justify-center overflow-hidden pt-16"
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text content */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex max-w-full flex-wrap items-center gap-2 px-3 py-2 sm:px-4 rounded-full theme-surface backdrop-blur-md border text-xs sm:text-sm text-purple-800 dark:text-purple-300 mb-8 transition-colors duration-500 shadow-sm"
                        >
                            <HiSparkles className="accent-icon animate-pulse-slow" />
                            Available for global opportunities
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-bold leading-tight mb-4"
                        >
                            <FullName size="hero" />
                        </motion.h1>

                        {/* Roles */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap items-center gap-2 mb-6"
                        >
                            {['AI Engineer', 'Data Scientist', 'Data Engineer'].map((role, i) => (
                                <React.Fragment key={role}>
                                    <span className="text-lg theme-text-secondary font-medium transition-colors duration-500">{role}</span>
                                    {i < 2 && <span className="accent-icon">|</span>}
                                </React.Fragment>
                            ))}
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-xl theme-text-secondary leading-relaxed mb-10 max-w-lg transition-colors duration-500"
                        >
                            "Turning{' '}
                            <span className="accent-icon font-semibold transition-colors duration-500">Data</span> into{' '}
                            <span className="accent-icon font-semibold transition-colors duration-500">Decisions</span> with{' '}
                            <span className="accent-icon font-semibold transition-colors duration-500">Intelligence</span> &amp; Precision."
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4 mb-14"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 overflow-visible"
                            >
                                <FiExternalLink size={16} />
                                View Projects
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="accent-outline group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass transition-all duration-300"
                            >
                                <FiMail size={16} />
                                Contact Me
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="grid grid-cols-3 gap-2 sm:flex sm:gap-8"
                        >
                            {[
                                { value: '1+', label: 'Years Experience' },
                                { value: '10+', label: 'Projects Shipped' },
                                { value: '10+', label: 'Global Clients' },
                            ].map((stat) => (
                                <div key={stat.label} className="min-w-0 text-center">
                                    <div className="text-2xl font-bold text-transparent bg-clip-text text-gradient">{stat.value}</div>
                                    <div className="text-[clamp(0.625rem,2.8vw,0.75rem)] theme-text-muted mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Bobbing Animated visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
                        transition={{ 
                            opacity: { duration: 1, delay: 0.3, ease: 'easeOut' }, 
                            scale: { duration: 1, delay: 0.3, ease: 'easeOut' },
                            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                        }}
                        className="hidden lg:flex items-center justify-center relative perspective-[1000px]"
                    >
                        {/* Interactive 3D Tilt Wrapper */}
                        <motion.div 
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            className="relative w-[420px] h-[420px] rounded-full flex items-center justify-center"
                        >
                            {/* Animated rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="accent-ring absolute inset-0 rounded-full border"
                                style={{ transform: "translateZ(10px)" }}
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="accent-ring absolute inset-8 rounded-full border opacity-70"
                                style={{ transform: "translateZ(30px)" }}
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                className="accent-ring absolute inset-16 rounded-full border opacity-45"
                                style={{ transform: "translateZ(50px)" }}
                            />

                            {/* Orbit dots */}
                            {orbitDots.map((dot, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, delay: dot.delay, repeat: Infinity }}
                                    className="orbit-dot absolute w-3 h-3 rounded-full"
                                    style={{ top: dot.top, left: dot.left, right: dot.right, bottom: dot.bottom, transform: 'translate(-50%,-50%) translateZ(40px)' }}
                                />
                            ))}

                            {/* Center glass card element tracking mouse */}
                            <div 
                                style={{ transform: "translateZ(80px)" }}
                                className="absolute theme-surface backdrop-blur-[20px] rounded-3xl w-[220px] h-[220px] flex flex-col items-center justify-center gap-4 border shadow-[0_15px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                            >
                                {/* Brain/AI icon */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    className="text-6xl"
                                >
                                    🧠
                                </motion.div>
                                <div className="text-center px-4">
                                    <div className="text-xs font-mono text-purple-800 dark:text-purple-300 tracking-widest uppercase">AI Engine</div>
                                    <div className="text-sm font-bold text-transparent bg-clip-text text-gradient mt-1">Data → Intelligence</div>
                                </div>

                                {/* Animated bars */}
                                <div className="flex gap-1.5 items-end h-8">
                                    {[40, 70, 55, 85, 65, 90, 72].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [`${h * 0.5}%`, `${h}%`, `${h * 0.7}%`, `${h}%`] }}
                                            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, repeatType: 'mirror' }}
                                            className="hero-chart-bar w-1.5 rounded-full"
                                            style={{ minHeight: 4 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative mt-8 mb-8 flex flex-col items-center gap-2 theme-text-muted"
            >
                <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
                <div className="p-2 backdrop-blur-md theme-surface border rounded-full">
                    <FiArrowDown size={14} className="accent-icon"/>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
