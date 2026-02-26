"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Zap, Globe, BarChart3, Settings, HelpCircle } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

const NAV_ITEMS = [
    { icon: Shield, label: 'Guardians', path: '#' },
    { icon: Zap, label: 'Blitz Match', path: '#' },
    { icon: Globe, label: 'Nexus', path: '#' },
    { icon: BarChart3, label: 'War Room', path: '#' },
    { icon: Settings, label: 'Matrix', path: '#' },
]

export default function CyberSidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 left-6 z-50 p-3 bg-black/50 border border-primary/50 text-primary hover:bg-primary/20 transition-all"
            >
                <Menu className="h-6 w-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop with RGB Split */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                        />

                        {/* Sidebar - Switchblade Unfold */}
                        <motion.div
                            initial={{ x: '-100%', skewX: -10 }}
                            animate={{ x: 0, skewX: 0 }}
                            exit={{ x: '-100%', skewX: 10 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            className="fixed top-0 left-0 h-full w-80 z-[70] bg-zinc-950 border-r border-primary/30 p-8 flex flex-col shadow-[20px_0_50px_-20px_rgba(255,0,60,0.3)]"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-2xl font-black tracking-tighter text-primary italic">CYBER-SETU</span>
                                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <nav className="flex-1 space-y-4">
                                {NAV_ITEMS.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative"
                                    >
                                        <a href={item.path} className="flex items-center gap-4 p-4 text-slate-400 group-hover:text-primary transition-all">
                                            <div className="relative">
                                                <item.icon className="h-6 w-6 z-10 relative" />
                                                <motion.div
                                                    className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-150 transition-transform"
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                />
                                            </div>
                                            <span className="font-bold tracking-widest uppercase text-sm group-hover:translate-x-2 transition-transform">
                                                {item.label}
                                            </span>
                                        </a>
                                        {/* Levitation Orb */}
                                        <motion.div
                                            className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full hidden group-hover:block"
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        />
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="pt-8 border-t border-slate-800 flex justify-between items-center">
                                <ModeToggle />
                                <div className="text-[10px] text-slate-600 font-mono">SYS_VER: 2.0.4-BETA</div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
