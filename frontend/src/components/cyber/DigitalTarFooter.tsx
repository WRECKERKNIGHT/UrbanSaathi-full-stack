"use client"

import { motion } from 'framer-motion'
import { Terminal, Send } from 'lucide-react'

export default function DigitalTarFooter() {
    return (
        <footer className="relative bg-black pt-20 overflow-hidden">
            {/* The Bubbling Tar Effect */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-black" />

            <div className="absolute top-0 left-0 w-full flex justify-around pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-20 h-20 bg-black rounded-full blur-xl"
                        animate={{
                            y: [0, -40, 0],
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-primary/20 relative z-10">
                <div className="space-y-6">
                    <h2 className="text-4xl font-black italic text-primary tracking-tighter uppercase">CYBER_SETU</h2>
                    <p className="text-slate-500 font-mono text-xs max-w-sm">
                        TERMINAL_ACCESS::ROOT@CYBER_SETU_V2.0 <br />
                        ESTABLISHED_2026 // NO_BACK_DOOR_POLICY <br />
                        [CONNECTED_TO_NEURAL_MESH]
                    </p>
                    <div className="flex gap-4">
                        <div className="h-10 w-10 bg-zinc-950 border border-primary/20 flex items-center justify-center text-primary group hover:border-primary transition-all cursor-pointer">
                            <Terminal className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-950 border border-primary/30 p-6 font-mono text-[10px] space-y-4 shadow-[0_0_30px_rgba(255,0,60,0.1)]">
                    <div className="flex items-center gap-2 text-primary">
                        <div className="w-2 h-2 bg-primary animate-pulse" />
                        STATED_AI_INTERFACE::READY
                    </div>
                    <div className="text-slate-500">
                        {">"} ENTER_PASSPHRASE_FOR_DANGEROUS_REVEALS...
                    </div>
                    <div className="flex gap-2">
                        <span className="text-primary">$</span>
                        <input
                            type="text"
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-800"
                            placeholder="_____________________"
                        />
                        <Send className="h-4 w-4 text-primary cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>

            <div className="text-center py-6 border-t border-white/5 bg-black">
                <p className="text-[10px] text-slate-800 uppercase tracking-[0.5em] font-black">
                    UrbanSaathi // Powered by Antigravity Cyber-Systems
                </p>
            </div>
        </footer>
    )
}
