"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function GlitchText({ text, className }: { text: string, className?: string }) {
    return (
        <div className={cn("relative group inline-block", className)}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 text-crimson opacity-0 group-hover:opacity-70 group-hover:animate-[glitch-text_0.3s_infinite] translate-x-1">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 text-acid-green opacity-0 group-hover:opacity-70 group-hover:animate-[glitch-text_0.3s_infinite_-0.1s] -translate-x-1">
                {text}
            </span>

            {/* Visual Distortion Lines */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none" />
        </div>
    )
}
