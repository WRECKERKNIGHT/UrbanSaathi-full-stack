'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

const phoneSchema = z.object({
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
});

const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export default function LoginPage() {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();

    const phoneForm = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: { phone: '' },
    });

    const otpForm = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' },
    });

    async function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
        setIsLoading(true);
        try {
            await api.post('/auth/send-otp', values);
            setPhone(values.phone);
            setStep('otp');
        } catch (error) {
            console.error('Failed to send OTP', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login-otp', {
                phone,
                otp: values.otp,
            });
            setAuth(response.data.user, response.data.access_token);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            otpForm.setError('otp', { message: "Invalid OTP. Try 123456" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                        Kaam<span className="text-blue-500">Setu</span>
                    </h1>
                    <p className="text-slate-400">Hyperlocal Skill-Verified Services</p>
                </div>

                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="text-white">
                            {step === 'phone' ? 'Welcome Back' : 'Verify Identity'}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            {step === 'phone'
                                ? 'Enter your phone number to continue'
                                : `We've sent a code to ${phone}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AnimatePresence mode="wait">
                            {step === 'phone' ? (
                                <motion.div
                                    key="phone"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <Form {...phoneForm}>
                                        <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                                            <FormField
                                                control={phoneForm.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-300">Phone Number</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                                <Input
                                                                    placeholder="9876543210"
                                                                    className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send OTP'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </form>
                                    </Form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="otp"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Form {...otpForm}>
                                        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                                            <FormField
                                                control={otpForm.control}
                                                name="otp"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-300">Enter 6-digit OTP</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                                <Input
                                                                    placeholder="000000"
                                                                    className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 tracking-widest font-mono"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify & Login'}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="link"
                                                className="w-full text-slate-400 hover:text-white"
                                                onClick={() => setStep('phone')}
                                            >
                                                Change Phone Number
                                            </Button>
                                        </form>
                                    </Form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <p className="text-xs text-center text-slate-500">
                            By clicking continue, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
