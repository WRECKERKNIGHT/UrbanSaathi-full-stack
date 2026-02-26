'use client';

import { useAuthStore } from '@/store/auth';
import { Button } from './ui/button';
import { LogOut, User, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span
                            className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                            onClick={() => router.push('/dashboard')}
                        >
                            Kaam<span className="text-blue-500">Setu</span>
                        </span>
                    </div>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex flex-col items-end mr-2">
                                <span className="text-sm font-medium text-white">{user.phone}</span>
                                <span className="text-xs text-slate-400 capitalize">{user.role}</span>
                            </div>

                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                <Bell className="h-5 w-5" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
