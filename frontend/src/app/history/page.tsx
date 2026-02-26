"use client"

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { History, Calendar, CheckCircle2, Clock, MapPin, ExternalLink } from 'lucide-react'
import CyberSidebar from '@/components/cyber/CyberSidebar'
import GlitchText from '@/components/cyber/GlitchText'
import api from '@/lib/api'
import { Badge } from '@/components/ui/badge'

export default function HistoryPage() {
    const { data: history, isLoading } = useQuery({
        queryKey: ['job-history'],
        queryFn: async () => {
            const response = await api.get('/jobs/history');
            return response.data;
        }
    })

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-primary font-mono">RETRIEVING_ARCHIVES...</div>

    return (
        <div className="min-h-screen bg-black text-white scanline">
            <CyberSidebar />

            <main className="max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <header className="mb-16 border-b border-primary/20 pb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase italic">
                            <GlitchText text="SERVICE_LOGS" />
                        </h1>
                        <p className="text-slate-500 font-mono text-[10px] mt-2 tracking-widest uppercase italic">
                            Engagement_History_//_Root_Access
                        </p>
                    </div>
                </header>

                <div className="space-y-6">
                    {history?.length === 0 ? (
                        <div className="text-center py-20 border border-white/5 bg-zinc-950/50">
                            <History className="h-12 w-12 text-slate-800 mx-auto mb-4" />
                            <p className="text-slate-600 font-mono text-xs uppercase tracking-widest">No spectral traces found in the history.</p>
                        </div>
                    ) : (
                        history?.map((job: any, i: number) => (
                            <motion.div
                                key={job.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-zinc-950 border border-primary/10 hover:border-primary/40 p-6 flex flex-col md:flex-row gap-6 transition-all"
                            >
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="rounded-none border-primary/30 text-primary bg-primary/5 uppercase font-black text-[9px] tracking-widest">
                                            {job.status}
                                        </Badge>
                                        <span className="text-[10px] text-slate-600 font-mono">JOB_ID: 0x{job.id.slice(0, 8).toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                                        {job.profession?.name || 'GENERIC_TASK'}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono max-w-xl line-clamp-2 italic">
                                        {job.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold uppercase">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 2026.FEB.20</span>
                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.locationName || 'UNDISCLOSED'}</span>
                                        <span className="flex items-center gap-1 text-primary">₹{job.totalBudget || '---'}</span>
                                    </div>
                                </div>

                                <div className="border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center items-end gap-3 min-w-[200px]">
                                    {job.assignments?.length > 0 ? (
                                        <div className="text-right">
                                            <div className="text-[9px] text-slate-600 uppercase font-mono mb-1">Assigned_Agent</div>
                                            <div className="text-white font-black text-sm uppercase tracking-tighter flex items-center gap-2">
                                                {job.assignments[0].provider?.phone}
                                                <ExternalLink className="h-3 w-3 text-primary" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-right text-slate-700 italic text-[10px]">UNMATCHED</div>
                                    )}
                                    <button className="w-full py-2 bg-primary/10 border border-primary/30 text-[10px] font-black uppercase text-primary tracking-widest hover:bg-primary hover:text-black transition-all">
                                        RECALL_DETAILS
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </main>
        </div>
    )
}
