"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function PlasmaOrbCTA({ label, onClick }: { label: string, onClick?: () => void }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isExploded, setIsExploded] = useState(false)

    const handleClick = () => {
        setIsExploded(true)
        setTimeout(() => {
            onClick?.()
            setIsExploded(false)
        }, 800)
    }

    return (
        <div className="relative group cursor-pointer" onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <AnimatePresence>
                {!isExploded ? (
                    <motion.div
                        className="relative w-32 h-32 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {/* The Orb */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-crimson shadow-[0_0_50px_rgba(255,0,60,0.5)] border border-white/20"
                            animate={{
                                boxShadow: isHovered
                                    ? ['0 0 50px rgba(255,0,60,0.8)', '0 0 100px rgba(173,255,0,0.4)', '0 0 50px rgba(255,0,60,0.8)']
                                    : '0 0 50px rgba(255,0,60,0.5)',
                                rotate: 360
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Electric Arcs (Simulated with simple spans for now) */}
                        {isHovered && [0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-full h-1 bg-blue-400 blur-[1px]"
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: [0, 1, 0], scaleX: [0.5, 1.2, 0.5], rotate: i * 45 + Math.random() * 20 }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 0.5 }}
                            />
                        ))}

                        <div className="relative z-10 text-white font-bold tracking-tighter text-center uppercase">
                            <Zap className="h-6 w-6 mx-auto mb-1 animate-pulse" />
                            {label}
                        </div>
                    </motion.div>
                ) : (
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-4 h-4 bg-white rounded-sm"
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 300,
                                    y: (Math.random() - 0.5) * 300,
                                    opacity: 0,
                                    rotate: Math.random() * 360
                                }}
                                transition={{ duration: 0.6 }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
