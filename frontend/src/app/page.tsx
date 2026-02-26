"use client"

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import CyberSidebar from '@/components/cyber/CyberSidebar'
import GlitchText from '@/components/cyber/GlitchText'
import PlasmaOrbCTA from '@/components/cyber/PlasmaOrbCTA'
import DigitalTarFooter from '@/components/cyber/DigitalTarFooter'

// Dynamically import HeroScene to prevent hydration issues with Three.js
const HeroScene = dynamic(() => import('@/components/cyber/HeroScene'), { ssr: false })

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden scanline">
      <CyberSidebar />

      {/* 3D Background */}
      <HeroScene />

      {/* Foreground Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center pointer-events-none mb-32">
        <div className="text-center px-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-2 pointer-events-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-20 bg-primary/50" />
              <span className="text-primary text-xs uppercase tracking-[0.5em] font-black">Platform 2.0_Online</span>
              <div className="h-px w-20 bg-primary/50" />
            </div>

            <h1 className="text-6xl md:text-9xl font-black font-outfit uppercase tracking-tighter text-white">
              <GlitchText text="URBAN" />
              <br />
              <span className="text-transparent border-t-4 border-primary bg-clip-text bg-gradient-to-b from-white to-slate-500">
                SAATHI
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-xl mx-auto text-slate-400 text-sm md:text-lg font-mono leading-relaxed"
          >
            [PROTOCOL_INITIATED] Architecting identity in the cyber-void. Verification is no longer a choice; it's survival.
            Shatter the glass ceiling of trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex justify-center pt-8 pointer-events-auto"
          >
            <PlasmaOrbCTA label="INITIALIZE" onClick={() => window.location.href = '/login'} />
          </motion.div>
        </div>

        {/* Floating Stat Panels */}
        <div className="absolute bottom-12 left-12 space-y-4 hidden md:block">
          {[
            { label: 'Active_Nodes', value: '1,240' },
            { label: 'Trust_Sync', value: '98.4%' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2 + i * 0.2 }}
              className="p-4 bg-black/40 border-l-2 border-primary backdrop-blur-md"
            >
              <div className="text-[10px] text-primary/70 uppercase font-mono">{stat.label}</div>
              <div className="text-xl font-black text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Real-time Ticker */}
        <div className="absolute top-12 right-12 text-right hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-acid-green font-mono uppercase tracking-[0.2em]"
          >
            Live_Feed::Matchmaking_Active
          </motion.div>
          <div className="text-white/40 text-[9px] font-mono mt-1">
            {">"} REQ_ID: 0x82...7F2 (PLUMBER_ELITE) <br />
            {">"} SYNCING_GEO_NODES...
          </div>
        </div>
      </main>

      <DigitalTarFooter />

      {/* Infinite Grid Background Component could be added here */}
      <div className="absolute inset-0 -z-5 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,0,60,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,60,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  )
}
