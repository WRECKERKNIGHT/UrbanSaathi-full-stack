'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingCart, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import CyberSidebar from '@/components/cyber/CyberSidebar';
import CyberGlobeStats from './CyberGlobeStats';
import GlitchText from '@/components/cyber/GlitchText';

export default function InsightsPage() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['platform-stats'],
        queryFn: async () => {
            const response = await api.get('/analytics/platform');
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    const cards = [
        {
            title: 'Gross Merchandise Value',
            value: `₹${stats?.totalGMV?.toLocaleString() || 0}`,
            description: '+12.5% from last month',
            icon: ShoppingCart,
            color: 'text-blue-500',
            trend: 'up',
        },
        {
            title: 'Platform Revenue',
            value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
            description: '10% platform commission',
            icon: DollarSign,
            color: 'text-green-500',
            trend: 'up',
        },
        {
            title: 'Job Completion Rate',
            value: `${stats?.completionRate?.toFixed(1) || 0}%`,
            description: `${stats?.completedJobs || 0} of ${stats?.totalJobs || 0} jobs`,
            icon: Activity,
            color: 'text-purple-500',
            trend: 'up',
        },
        {
            title: 'Active Providers',
            value: stats?.activeUsers || 124,
            description: '+4 new today',
            icon: Users,
            color: 'text-orange-500',
            trend: 'up',
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white scanline">
            <CyberSidebar />

            <main className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <header className="mb-12 flex justify-between items-end border-b border-primary/20 pb-8">
                    <div>
                        <h1 className="text-6xl font-black font-outfit uppercase italic tracking-tighter">
                            <GlitchText text="WAR ROOM" />
                        </h1>
                        <p className="text-primary text-xs font-mono tracking-[0.3em] mt-2 underline decoration-primary/50 underline-offset-4">
                            SYSTEM_ANALYTICS_V4.2.0
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-950 border border-primary/10 p-6 relative overflow-hidden group hover:border-primary/50 transition-colors"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{card.title}</span>
                                <card.icon className={`h-4 w-4 ${card.color} opacity-50`} />
                            </div>
                            <div className="text-3xl font-black font-outfit tracking-tighter">{card.value}</div>
                            <div className="text-[9px] text-slate-600 font-mono mt-2 lowercase italic">
                                {card.description}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <CyberGlobeStats />
                    </div>


                    <Card className="bg-slate-900 border-slate-800 text-white">
                        <CardHeader>
                            <CardTitle>Top Professions</CardTitle>
                            <CardDescription>Most requested services.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: 'Plumber', count: 142, color: 'bg-blue-500' },
                                { name: 'Electrician', count: 98, color: 'bg-green-500' },
                                { name: 'Carpenter', count: 64, color: 'bg-purple-500' },
                                { name: 'Cleaner', count: 42, color: 'bg-orange-500' },
                            ].map((prof, i) => (
                                <div key={prof.name} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>{prof.name}</span>
                                        <span className="text-slate-400">{prof.count} jobs</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(prof.count / 142) * 100}%` }}
                                            className={`h-full ${prof.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    );
}
