'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const jobId = searchParams.get('jobId');
    const amount = searchParams.get('amount') || '0';
    const transactionId = searchParams.get('transactionId');

    const handlePay = async () => {
        setIsLoading(true);
        try {
            // Simulated Gateway Confirmation
            await api.post('/finance/confirm-payment', {
                transactionId: transactionId || 'simulated_txn_' + Date.now(),
                gatewayId: 'GAY_TEST_' + Math.random().toString(36).substring(7),
            });
            setIsSuccess(true);
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
        } catch (error) {
            console.error('Payment failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 text-center py-20">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center"
                >
                    <CheckCircle className="h-10 w-10 text-white" />
                </motion.div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Payment Successful!</h2>
                    <p className="text-slate-400">Your funds are now in escrow. Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto py-12 px-4">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 text-slate-400 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Button>

            <Card className="bg-slate-900 border-slate-800 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                        <CreditCard className="h-6 w-6 mr-2 text-blue-500" />
                        Complete Payment
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Securely pay through our Hyperlocal Escrow System.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Service Amount</span>
                            <span className="font-medium text-white">₹{amount}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-lg">
                            <span className="text-white">Total</span>
                            <span className="text-blue-500">₹{amount}</span>
                        </div>
                    </div>

                    <div className="flex items-start bg-blue-500/5 p-3 rounded-md border border-blue-500/10">
                        <ShieldCheck className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Your payment is held in **KaamSetu Escrow**. The provider will only receive the funds once you mark the job as **COMPLETED**.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handlePay}
                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                            </>
                        ) : `Pay ₹${amount}`}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Suspense fallback={<div className="flex items-center justify-center p-20"><Loader2 className="animate-spin" /></div>}>
                <CheckoutContent />
            </Suspense>
        </div>
    );
}
