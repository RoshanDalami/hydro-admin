'use client'

import { motion } from 'framer-motion'
import {
    Headphones,
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Clock,
    Building2,
    ExternalLink,
    Sparkles,
    Heart,
} from 'lucide-react'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut' as const,
        },
    },
}

const floatAnimation = {
    y: [-5, 5, -5],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
    },
}

const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
    },
}

const contactMethods = [
    {
        icon: Mail,
        title: 'Email Us',
        value: 'support@softechfoundation.com',
        description: 'We reply within 24 hours',
        color: 'from-violet-500 to-purple-600',
        bgColor: 'bg-violet-500/10',
        href: 'mailto:support@softechfoundation.com',
    },
    {
        icon: Phone,
        title: 'Call Us',
        value: '+977-XXX-XXXXXX',
        description: 'Mon-Fri from 9am to 6pm',
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-500/10',
        href: 'tel:+977XXXXXXXXXX',
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        value: 'Kathmandu, Nepal',
        description: 'Come say hello at our office',
        color: 'from-orange-500 to-red-600',
        bgColor: 'bg-orange-500/10',
        href: '#',
    },
]

function SupportView() {
    return (
        <div className="bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden relative py-8">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <motion.div
                        animate={floatAnimation}
                        className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/25"
                    >
                        <Headphones className="w-10 h-10 text-white" />
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-4"
                    >
                        Need Help?
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        For any support and assistance, please contact
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        animate={pulseAnimation}
                        className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-violet-500/20 backdrop-blur-sm"
                    >
                        <Building2 className="w-5 h-5 text-violet-500" />
                        <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            Softech Foundation Pvt. Ltd.
                        </span>
                        <Sparkles className="w-5 h-5 text-purple-500" />
                    </motion.div>
                </motion.div>

                {/* Contact Cards */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                >
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.title}
                            href={method.href}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -5,
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 p-6 cursor-pointer transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10"
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className={`inline-flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${method.color} shadow-lg`}
                                >
                                    <method.icon className="w-7 h-7 text-white" />
                                </motion.div>

                                <h3 className="text-lg font-semibold text-foreground mb-1">
                                    {method.title}
                                </h3>
                                <p className="text-base font-medium text-foreground/80 mb-2">
                                    {method.value}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {method.description}
                                </div>

                                <motion.div
                                    initial={{ x: -10, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                    className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                                </motion.div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Support Message Card */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-[1px]"
                >
                    <div className="relative rounded-3xl bg-card/95 backdrop-blur-xl p-8 sm:p-10">
                        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/30"
                            >
                                <MessageCircle className="w-8 h-8 text-white" />
                            </motion.div>

                            <div className="flex-1">
                                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                                    We&apos;re Here to Help
                                </h2>
                                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                                    Our dedicated support team at{' '}
                                    <span className="font-semibold text-violet-600 dark:text-violet-400">
                                        Softech Foundation Pvt. Ltd.
                                    </span>{' '}
                                    is ready to assist you with any questions, concerns, or
                                    technical issues you may have. Don&apos;t hesitate to reach
                                    out!
                                </p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl" />
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <span>Made with</span>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        </motion.div>
                        <span>by Softech Foundation</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default SupportView