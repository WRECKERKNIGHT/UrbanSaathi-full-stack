"use client"

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Shield, Zap, Star, MapPin, Award, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import CyberSidebar from '@/components/cyber/CyberSidebar'
import GlitchText from '@/components/cyber/GlitchText'
import api from '@/lib/api'

export default function PortfolioPage() {
    const { id } = useParams()

    const { data: profile, isLoading } = useQuery({
        queryKey: ['provider-portfolio', id],
        queryFn: async () => {
            const response = await api.get(`/users/provider/${id}`);
            return response.data;
        }
    })

    const { data: workHistory } = useQuery({
        queryKey: ['provider-work', id],
        queryFn: async () => {
            const response = await api.get(`/jobs/provider/${id}/work`);
            // In a real app we might have a specific public work endpoint
            return response.data;
        },
        enabled: !!profile
    })

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-primary animate-pulse font-mono">LINK_ESTABLISHING...</div>

    return (
        <div className="min-h-screen bg-black text-white scanline">
            <CyberSidebar />

            <main className="max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <header className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-20 border-b border-primary/20 pb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-48 h-48 group"
                    >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all" />
                        <div className="relative z-10 w-full h-full border-2 border-primary/50 flex items-center justify-center bg-zinc-950 overflow-hidden">
                            <Shield className="h-24 w-24 text-primary opacity-50" />
                        </div>
                        {/* Trust Score overlay */}
                        <div className="absolute -bottom-4 -right-4 bg-primary text-black font-black p-3 px-5 skew-x-[-15deg] shadow-[5px_5px_0_#000]">
                            {profile?.trustScore || '4.8'}
                        </div>
                    </motion.div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase italic">
                            <GlitchText text={profile?.phone || 'PROVIDER_ID_0x7F'} />
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-mono text-slate-400">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> NE_ZONE_4</span>
                            <span className="flex items-center gap-1 text-acid-green"><Award className="h-3 w-3" /> VERIFIED_EXPERT</span>
                            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> 100%_RESPONSE_RATE</span>
                        </div>
                        <p className="max-w-lg text-slate-500 text-sm leading-relaxed lowercase">
                            Master of the industrial arts. Solving infrastructural anomalies with surgical precision.
                            Specializing in deep-pipe diagnostics and neural-electrical grid maintenance.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <section className="md:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Core_Disciplines</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Plumbing', 'Hydraulics', 'Emergency_Fix'].map(skill => (
                                    <span key={skill} className="p-2 border border-primary/30 text-[10px] uppercase font-bold text-white bg-primary/10">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-zinc-950 border border-primary/10">
                            <div className="text-[10px] text-slate-500 font-bold uppercase mb-4">Platform_Metrics</div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Completed_Incursions', val: '42' },
                                    { label: 'Avg_Rating', val: '5.0' },
                                    { label: 'Neural_Trust', val: '98%' },
                                ].map(m => (
                                    <div key={m.label} className="flex justify-between items-end border-b border-white/5 pb-1">
                                        <span className="text-[9px] text-slate-600 font-mono italic">{m.label}</span>
                                        <span className="text-sm font-black text-primary">{m.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="md:col-span-2 space-y-6">
                        <h3 className="text-white font-black uppercase tracking-tighter italic text-xl flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            Engagement_Manifest
                        </h3>

                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 bg-zinc-950 border-l-4 border-primary group hover:bg-zinc-900 transition-all flex justify-between items-center"
                                >
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-primary/70 font-mono">JOB_ID: 0xRE_00{i}</div>
                                        <div className="text-lg font-black tracking-tighter uppercase italic">LEAK_ANOMALY_FIXED</div>
                                        <div className="text-[9px] text-slate-600">CLIENT: 0xUSER_0A // DATE: 2026.FEB.12</div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 text-primary fill-primary" />)}
                                        </div>
                                        <span className="text-[8px] bg-primary/20 p-1 text-primary font-bold">SUCCESSFUL_EXTRACTION</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
