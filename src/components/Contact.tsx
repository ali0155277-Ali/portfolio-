import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin } from 'react-icons/fi'
import {
    FaLinkedin,
    FaGithub,
    FaYoutube,
    FaFacebook,
} from 'react-icons/fa'

const socials = [
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ali-gabriel-ali015', color: 'hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]' },
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/ali0155277-Ali', color: 'hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]' },
    { icon: FaYoutube, label: 'YouTube', href: '#', color: 'hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]' },
    { icon: FaFacebook, label: 'Facebook', href: 'https://www.facebook.com/lyjbrylalhwary.2025', color: 'hover:text-purple-800 dark:hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]' },
]

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [focused, setFocused] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3500)
        setFormState({ name: '', email: '', message: '' })
    }

    const inputClass = (field: string) =>
        `w-full px-4 py-3 rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none
     transition-all duration-300 resize-none
     bg-[var(--color-surface)] border ${focused === field
            ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
            : 'border-[var(--color-border)] hover:border-slate-400 dark:hover:border-white/20'
        }`

    return (
        <section id="contact" className="py-24 relative overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-purple-600/10 rounded-full blur-[100px]" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono theme-label tracking-[0.3em] uppercase mb-3 block transition-colors duration-500">
                        Get In Touch
                    </span>
                    <h2 className="section-heading mb-4">Contact</h2>
                    <p className="theme-text-secondary max-w-lg mx-auto transition-colors duration-500">
                        Ready to build something extraordinary? Let's discuss how AI can transform your business.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 transition-colors duration-500">Let's collaborate</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: FiMail, label: 'Email', value: 'ali.0155277@gmail.com' },
                                    { icon: FiMapPin, label: 'Location', value: 'Remote / Global' },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center text-purple-400 shrink-0 transition-colors duration-500">
                                            <Icon size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs theme-text-muted font-mono uppercase tracking-wider transition-colors duration-500">{label}</p>
                                            <p className="text-sm theme-text-secondary transition-colors duration-500">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social icons */}
                        <div>
                            <p className="text-xs font-mono theme-text-muted uppercase tracking-widest mb-4 transition-colors duration-500">Connect</p>
                            <div className="flex gap-3">
                                {socials.map(({ icon: Icon, label, href, color }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`w-11 h-11 rounded-xl glass-dark flex items-center justify-center theme-text-secondary transition-all duration-300 ${color}`}
                                        aria-label={label}
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Availability card */}
                        <div                         className="premium-card rounded-2xl p-6 transition-colors duration-500">
                            <div className="flex items-center gap-3">
                                <div className="availability-dot w-2.5 h-2.5 rounded-full animate-pulse-slow" />
                                <div>
                                    <p className="text-sm font-medium text-green-800 dark:text-green-300 transition-colors duration-500">Available for new projects</p>
                                    <p className="text-xs text-green-700 dark:text-green-400 mt-0.5 transition-colors duration-500">Response within 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="premium-card glass-dark transition-colors duration-500 rounded-2xl p-6 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-mono theme-text-secondary uppercase tracking-wider mb-2 block transition-colors duration-500">Name</label>
                                    <input
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Your name"
                                        required
                                        className={inputClass('name')}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-mono theme-text-secondary uppercase tracking-wider mb-2 block transition-colors duration-500">Email</label>
                                    <input
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="your@email.com"
                                        required
                                        className={inputClass('email')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-mono theme-text-secondary uppercase tracking-wider mb-2 block transition-colors duration-500">Message</label>
                                <textarea
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    required
                                    className={inputClass('message')}
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary group relative w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300"
                            >
                                {submitted ? (
                                    <span className="flex items-center gap-2 text-white">✓ Message Sent!</span>
                                ) : (
                                    <>
                                        <FiSend size={15} />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
