import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../context/useTheme'
import FullName from './FullName'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
]

const Navbar: React.FC = () => {
    const { isDark, toggleTheme } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const navbarRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setScrolled(scrollY > 20)
            setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const visibleSections = new Map<Element, number>()
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleSections.set(entry.target, entry.intersectionRatio)
                } else {
                    visibleSections.delete(entry.target)
                }
            })

            const active = [...visibleSections.entries()]
                .sort((first, second) => second[1] - first[1])[0]
            setActiveSection(active ? (active[0] as HTMLElement).id : '')
        }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 })

        navLinks.forEach(({ href }) => {
            const section = document.getElementById(href.slice(1))
            if (section) observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!menuOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpen(false)
                menuButtonRef.current?.focus()
            }
        }
        const closeOnOutsideTap = (event: PointerEvent) => {
            if (!navbarRef.current?.contains(event.target as Node)) {
                setMenuOpen(false)
            }
        }

        document.addEventListener('keydown', closeOnEscape)
        document.addEventListener('pointerdown', closeOnOutsideTap)

        return () => {
            document.removeEventListener('keydown', closeOnEscape)
            document.removeEventListener('pointerdown', closeOnOutsideTap)
            document.body.style.overflow = previousOverflow
        }
    }, [menuOpen])

    const navigateTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault()
        setMenuOpen(false)
        const target = document.getElementById(href.slice(1))

        if (target) {
            window.requestAnimationFrame(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
        }
    }

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-transparent">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-500 dark:via-cyan-400 dark:to-indigo-500 transition-colors duration-500"
                    style={{ scaleX: scrollProgress / 100, transformOrigin: 'left center' }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Navbar */}
            <div ref={navbarRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
                <motion.nav
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`transition-all duration-500 rounded-full px-3 sm:px-6 overflow-hidden ${scrolled
                        ? 'glass py-2'
                        : 'bg-transparent py-4'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            whileHover={{ scale: 1.05 }}
                            className="flex min-w-0 items-center gap-2 group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-600 flex items-center justify-center shadow-sm dark:shadow-glow-blue transition-all duration-500 group-hover:shadow-md">
                                <span className="text-white font-bold text-sm">AG</span>
                            </div>
                            <FullName
                                size="navbar"
                                className="font-bold tracking-tight transition-colors duration-500"
                            />
                        </motion.a>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                                    className={`nav-link-accent text-sm font-medium theme-text-secondary transition-all duration-300 relative group ${activeSection === link.href.slice(1) ? 'is-active' : ''}`}
                                >
                                    {link.label}
                                    <span className="nav-accent-underline" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Theme Toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="accent-icon h-11 w-11 shrink-0 rounded-xl theme-surface backdrop-blur-md border flex items-center justify-center transition-colors duration-300"
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isDark ? 'sun' : 'moon'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>

                            {/* Mobile menu button */}
                            <button
                                ref={menuButtonRef}
                                className="accent-icon md:hidden h-11 w-11 shrink-0 rounded-full theme-surface backdrop-blur-md border flex items-center justify-center transition-colors duration-300"
                                onClick={() => setMenuOpen((open) => !open)}
                                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-navigation"
                            >
                                {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                            </button>
                        </div>
                    </div>
                </motion.nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            id="mobile-navigation"
                            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
                            style={{ transformOrigin: 'top center' }}
                            className="md:hidden absolute top-[110%] left-0 w-full glass-dark backdrop-blur-2xl rounded-2xl md:hidden overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                        >
                            <div className="px-4 py-3 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={(event) => navigateTo(event, link.href)}
                                        aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                                        className={`nav-link-accent flex min-h-11 items-center justify-center text-sm font-medium theme-text-secondary transition-colors text-center ${activeSection === link.href.slice(1) ? 'is-active' : ''}`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default Navbar
