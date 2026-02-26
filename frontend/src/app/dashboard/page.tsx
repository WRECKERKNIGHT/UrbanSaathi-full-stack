import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useSocket } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Briefcase, Clock, MapPin, CheckCircle, AlertCircle, History, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CyberSidebar from '@/components/cyber/CyberSidebar';
import GlitchText from '@/components/cyber/GlitchText';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const { socket, isConnected } = useSocket(user?.id);
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        if (!socket) return;
        socket.on('NEW_JOB_OFFER', (data) => {
            setNotifications((prev) => [{ id: Date.now(), type: 'offer', ...data }, ...prev]);
        });
        socket.on('ASSIGNMENT_ACCEPTED', (data) => {
            setNotifications((prev) => [{ id: Date.now(), type: 'acceptance', ...data }, ...prev]);
        });
        return () => {
            socket.off('NEW_JOB_OFFER');
            socket.off('ASSIGNMENT_ACCEPTED');
        };
    }, [socket]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white scanline">
            <CyberSidebar />

            <main className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-primary/20 pb-8">
                    <div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase">
                            <GlitchText text="NEXUS_DASH" />
                        </h1>
                        <p className="text-slate-500 font-mono text-[10px] mt-2 uppercase">
                            USER: {user.phone} // STATUS: {isConnected ? <span className="text-acid-green">ONLINE</span> : <span className="text-crimson">OFFLINE</span>}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/history')}
                            className="p-3 bg-zinc-950 border border-primary/20 text-primary hover:bg-primary/10 transition-all flex items-center gap-2 font-black text-[10px] tracking-widest uppercase"
                        >
                            <History className="h-4 w-4" />
                            Archives
                        </button>
                        {user.role === 'CUSTOMER' && (
                            <button
                                onClick={() => router.push('/post-job')}
                                className="p-3 bg-primary text-black font-black text-[10px] tracking-widest uppercase flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                                <Plus className="h-4 w-4" />
                                Initiate_Job
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-white font-black uppercase tracking-tighter italic text-xl flex items-center gap-2 mb-6">
                                <Briefcase className="h-5 w-5 text-primary" />
                                {user.role === 'CUSTOMER' ? 'Active_Directives' : 'Neural_Feed'}
                            </h3>

                            <div className="space-y-4">
                                {notifications.length === 0 ? (
                                    <div className="p-12 border border-white/5 bg-zinc-950/50 text-center flex flex-col items-center">
                                        <AlertCircle className="h-10 w-10 text-slate-800 mb-4" />
                                        <p className="text-slate-600 font-mono text-xs uppercase">No active match signals detected.</p>
                                    </div>
                                ) : (
                                    notifications.map((notif) => (
                                        <motion.div
                                            key={notif.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="p-6 bg-zinc-950 border-l-4 border-acid-green relative overflow-hidden group"
                                        >
                                            <div className="absolute top-0 right-0 p-2 bg-acid-green/10 text-acid-green font-mono text-[8px] uppercase">
                                                {notif.type}
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-xl font-black tracking-tighter uppercase italic">{notif.type === 'offer' ? notif.profession : 'Direct_Contract'}</h4>
                                                <p className="text-[10px] text-slate-500 font-mono italic">REQ_ID: 0x{notif.id.toString().slice(-6)}</p>

                                                {notif.type === 'offer' ? (
                                                    <div className="flex gap-4 pt-4">
                                                        <button className="flex-1 bg-acid-green text-black font-black text-[10px] py-2 uppercase tracking-widest hover:brightness-110 transition-all">Accept_Incursion</button>
                                                        <button className="flex-1 border border-white/10 text-slate-500 font-black text-[10px] py-2 uppercase tracking-widest hover:text-white transition-all">Dismiss</button>
                                                    </div>
                                                ) : (
                                                    <div className="p-3 bg-acid-green/5 border border-acid-green/20 text-acid-green text-[10px] font-mono uppercase italic">
                                                        Agent {notif.providerName} has established a link. Extraction starting.
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="p-6 bg-zinc-950 border border-primary/20">
                            <h3 className="text-primary font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Neural_Identity
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 border-2 border-primary/50 flex items-center justify-center bg-black text-primary font-black">
                                        {user.phone.slice(-2)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black tracking-tighter uppercase text-white">{user.phone}</div>
                                        <div className="text-[9px] text-slate-600 font-mono uppercase">{user.role}_PROTOCOL</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <span className="text-slate-400">Trust_Level</span>
                                        <span className="text-primary">85%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '85%' }}
                                            className="h-full bg-primary shadow-[0_0_10px_#FF003C]"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push(user.role === 'PROVIDER' ? `/portfolio/${user.id}` : '#')}
                                    className="w-full py-2 border border-white/10 text-slate-500 hover:text-white hover:border-primary/50 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                                >
                                    View_Neural_Profile
                                </button>
                            </div>
                        </section>

                        <section className="p-6 bg-zinc-950 border border-white/5">
                            <h3 className="text-slate-500 font-black uppercase tracking-widest text-[9px] mb-4">Infrastructural_Status</h3>
                            <div className="space-y-3 text-[10px] font-mono text-slate-700">
                                <div className="flex items-center gap-2"><div className="h-1 w-1 bg-acid-green rounded-full" /> DB_SYNC: SUCCESS</div>
                                <div className="flex items-center gap-2"><div className="h-1 w-1 bg-acid-green rounded-full" /> MATCH_ENGINE: OPERATIONAL</div>
                                <div className="flex items-center gap-2"><div className="h-1 w-1 bg-slate-800 rounded-full" /> NEXT_NODAL_RESYNC: 320s</div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

