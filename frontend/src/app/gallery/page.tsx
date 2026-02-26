"use client"

import CyberSidebar from '@/components/cyber/CyberSidebar'
import dynamic from 'next/dynamic'
import GlitchText from '@/components/cyber/GlitchText'
import DigitalTarFooter from '@/components/cyber/DigitalTarFooter'

const GalleryCarousel = dynamic(() => import('@/components/cyber/GalleryCarousel'), { ssr: false })

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-black text-white scanline">
            <CyberSidebar />

            <main className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <header className="mb-20 text-center space-y-4">
                    <h1 className="text-7xl font-black italic tracking-tighter uppercase italic">
                        <GlitchText text="MOD_NEXUS" />
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-primary/30" />
                        <span className="text-primary text-[10px] font-mono tracking-[0.5em] uppercase">Hyperview_Gallery</span>
                        <div className="h-px w-12 bg-primary/30" />
                    </div>
                </header>

                <div className="relative mb-24">
                    <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
                    <GalleryCarousel />

                    {/* UI Instruction */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary font-mono text-[8px] animate-pulse">
                        [MOUSE_SELECT_TO_SHATTER_CONTAINMENT]
                    </div>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-zinc-950 border border-primary/10 p-8 hover:border-primary/40 transition-all group">
                            <div className="text-[10px] text-primary/50 font-mono mb-2 tracking-widest uppercase">NODE_00{i}</div>
                            <h4 className="text-xl font-black tracking-tighter mb-4 italic group-hover:text-primary transition-colors uppercase">
                                Neural_Link_0x{i}F
                            </h4>
                            <p className="text-xs text-slate-500 font-mono leading-relaxed lowercase">
                                Encrypted metadata discovered in the silicon drift. High-fidelity rendering of verified skill-sets.
                            </p>
                        </div>
                    ))}
                </section>
            </main>

            <DigitalTarFooter />
        </div>
    )
}
