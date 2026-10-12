import React from 'react'
import { motion } from 'framer-motion'
import { FiCpu, FiTrendingUp, FiPieChart, FiSmartphone } from 'react-icons/fi'

const services = [
    {
        icon: <FiCpu className="w-8 h-8" />,
        title: "AI & Machine Learning Solutions",
        description: "End-to-end development of intelligent ML systems — from data collection and model design to deployment and monitoring."
    },
    {
        icon: <FiTrendingUp className="w-8 h-8" />,
        title: "Predictive Modeling & Forecasting",
        description: "High-accuracy forecasting models using cutting-edge algorithms and statistical rigor to drive proactive decision-making."
    },
    {
        icon: <FiPieChart className="w-8 h-8" />,
        title: "BI Dashboard Development",
        description: "Intuitive, real-time Power BI dashboards integrated with your data sources for executive-level reporting and KPI visibility."
    },
    {
        icon: <FiSmartphone className="w-8 h-8" />,
        title: "Mobile App Development",
        description: "Designing and developing high-performance, cross-platform mobile applications for iOS and Android using Flutter and Dart, with seamless Firebase integration."
    }
];

const ServiceCard: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="premium-card rounded-xl p-6 relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
        >
            {/* Subtle background radial gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-indigo-500/10 transition-all duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-800 dark:text-blue-400 mb-6 group-hover:scale-110 group-hover:shadow-glow-blue transition-all duration-300">
                    {service.icon}
                </div>

                <h3 className="text-xl font-bold theme-text-primary mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-800 group-hover:to-cyan-800 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400 transition-all duration-300">
                    {service.title}
                </h3>

                <p className="theme-text-secondary leading-relaxed flex-grow text-sm md:text-base">
                    {service.description}
                </p>
            </div>
        </motion.div>
    );
};

const Services: React.FC = () => {
    return (
        <section id="services" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="section-heading inline-block mb-4">
                            Services I Provide
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
