"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useSocket } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Briefcase, Clock, MapPin, CheckCircle, AlertCircle, History, User, ArrowRight, Star, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';

export default function DashboardPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const { socket, isConnected } = useSocket(user?.id);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

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

    const mockStats = [
        { label: 'Total Jobs', value: '24', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
        { label: 'Completed', value: '18', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
        { label: 'Rating', value: '4.8', icon: Star, color: 'from-yellow-500 to-orange-500' },
        { label: 'Earnings', value: '₹12,450', icon: Zap, color: 'from-purple-500 to-pink-500' },
    ];

    const mockJobs = [
        {
            id: 1,
            title: 'Plumbing Repair',
            location: 'Downtown',
            date: '2024-07-10',
            status: 'active',
            rating: 4.8,
            customer: 'John Doe',
            amount: '₹500',
        },
        {
            id: 2,
            title: 'Electrical Work',
            location: 'Westside',
            date: '2024-07-09',
            status: 'completed',
            rating: 5,
            customer: 'Jane Smith',
            amount: '₹800',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-white mb-2">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{user.phone}</span>
                            </h1>
                            <p className="text-gray-400 flex items-center gap-2">
                                <span className={`inline-flex items-center gap-1 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                                    <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                                    {isConnected ? 'Online' : 'Offline'}
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {user.role === 'CUSTOMER' && (
                                <Button
                                    onClick={() => router.push('/post-job')}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-blue-500/50"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Post a Job
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                onClick={() => router.push('/history')}
                                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                            >
                                <History className="h-4 w-4 mr-2" />
                                History
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    {mockStats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card
                                key={i}
                                className="bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-blue-500/50 transition-all duration-300"
                            >
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                                        </div>
                                        <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid lg:grid-cols-3 gap-8"
                >
                    {/* Jobs List */}
                    <div className="lg:col-span-2">
                        <Card className="bg-gradient-to-br from-white/5 to-white/0 border-white/10">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-white">
                                            {user.role === 'CUSTOMER' ? 'Your Posted Jobs' : 'Available Jobs'}
                                        </CardTitle>
                                        <CardDescription>Manage and track your jobs</CardDescription>
                                    </div>
                                </div>
                                {/* Tabs */}
                                <div className="flex gap-2 mt-4">
                                    {['active', 'completed'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab as 'active' | 'completed')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                activeTab === tab
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                        >
                                            {tab === 'active' ? 'Active' : 'Completed'}
                                        </button>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {notifications.length === 0 && mockJobs.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <AlertCircle className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400">No jobs yet. Start by posting a job!</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Notifications */}
                                        {notifications.length > 0 && (
                                            <div className="space-y-3">
                                                {notifications.slice(0, 3).map((notif) => (
                                                    <motion.div
                                                        key={notif.id}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:border-blue-500/60 transition-all cursor-pointer"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-white mb-1">
                                                                    {notif.type === 'offer' ? 'New Job Offer' : 'Job Accepted'}
                                                                </h4>
                                                                <p className="text-sm text-gray-300">New opportunity available</p>
                                                                <p className="text-xs text-gray-400 mt-1">REQ_ID: 0x{notif.id.toString().slice(-6)}</p>
                                                            </div>
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${notif.type === 'offer' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                                {notif.type === 'offer' ? 'New' : 'Accepted'}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Mock Jobs */}
                                        {mockJobs.length > 0 && (
                                            <div className="space-y-3">
                                                {mockJobs
                                                    .filter((job) => activeTab === 'active' ? job.status === 'active' : job.status === 'completed')
                                                    .map((job) => (
                                                        <motion.div
                                                            key={job.id}
                                                            initial={{ x: -20, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500/30 transition-all cursor-pointer group"
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="flex-1">
                                                                    <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{job.title}</h4>
                                                                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                                                                        <span className="flex items-center gap-1">
                                                                            <MapPin className="h-4 w-4" />
                                                                            {job.location}
                                                                        </span>
                                                                        <span className="flex items-center gap-1">
                                                                            <Clock className="h-4 w-4" />
                                                                            {job.date}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500">by {job.customer}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="font-bold text-cyan-400 mb-1">{job.amount}</p>
                                                                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                                                        {Array(5).fill(0).map((_, i) => (
                                                                            <span key={i}>★</span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="text-white font-medium">{user.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Role</p>
                                    <p className="text-white font-medium capitalize">{user.role}</p>
                                </div>
                                <Button className="w-full mt-4 bg-blue-500/50 hover:bg-blue-500/70 text-white">
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                            <CardHeader>
                                <CardTitle className="text-white">Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Response Time</span>
                                    <span className="text-green-400 font-bold">2 min</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Completion Rate</span>
                                    <span className="text-green-400 font-bold">95%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Trust Score</span>
                                    <span className="text-green-400 font-bold">Excellent</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Next Steps */}
                        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                            <CardHeader>
                                <CardTitle className="text-white">Recommended</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <button className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors text-blue-400 hover:text-blue-300 text-sm font-medium">
                                    Complete your profile
                                </button>
                                <button className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors text-blue-400 hover:text-blue-300 text-sm font-medium">
                                    Verify your phone
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
