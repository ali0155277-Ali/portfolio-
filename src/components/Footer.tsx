import React from 'react'
import { motion } from 'framer-motion'
import FullName from './FullName'

const Footer: React.FC = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="border-t border-[var(--color-border)] py-8 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[10px]">AG</span>
                        </div>
                        <FullName size="footer" className="text-sm theme-text-muted transition-colors duration-500" />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs theme-text-muted font-mono text-center transition-colors duration-500"
                    >
                        © {year} Ali Gabriel Ali. Crafted with{' '}
                        <span className="accent-icon transition-colors duration-500">precision</span> &amp;{' '}
                        <span className="accent-icon transition-colors duration-500">intelligence</span>.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-1.5 text-xs theme-text-muted transition-colors duration-500"
                    >
                        <span className="availability-dot w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500" />
                        All systems operational
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
