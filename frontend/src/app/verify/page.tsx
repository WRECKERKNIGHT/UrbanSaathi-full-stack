'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, CheckCircle, AlertTriangle, Loader2, Award, FileText } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function VerifyPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [docType, setDocType] = useState('AADHAAR');
    const [docNumber, setDocNumber] = useState('');

    const handleSubmitIdentity = async () => {
        setIsLoading(true);
        try {
            await api.post('/trust/identity/submit', {
                docType,
                docNumber,
                frontUrl: 'https://placeholder.com/id_front.jpg',
                backUrl: 'https://placeholder.com/id_back.jpg',
            });
            toast.success('Identity documents submitted for verification');
            setStep(2);
        } catch (error) {
            toast.error('Submission failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="max-w-4xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <header className="space-y-2">
                            <h1 className="text-4xl font-bold font-outfit">Provider Verification</h1>
                            <p className="text-slate-400">Increase your matching priority by verifying your identity and skills.</p>
                        </header>

                        {step === 1 ? (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <FileText className="h-6 w-6 mr-2 text-blue-500" />
                                            Step 1: Identity Verification
                                        </CardTitle>
                                        <CardDescription>Upload your government-issued ID for verification.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Document Type</Label>
                                            <Select value={docType} onValueChange={setDocType}>
                                                <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                                    <SelectValue placeholder="Select ID Type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                                    <SelectItem value="AADHAAR">Aadhaar Card</SelectItem>
                                                    <SelectItem value="VOTER_ID">Voter ID</SelectItem>
                                                    <SelectItem value="DRIVING_LICENSE">Driving License</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Document Number</Label>
                                            <Input
                                                placeholder="Enter ID Number"
                                                value={docNumber}
                                                onChange={(e) => setDocNumber(e.target.value)}
                                                className="bg-slate-950 border-slate-800 text-white"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            <div className="border-2 border-dashed border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:border-blue-500/50 transition-colors cursor-pointer bg-slate-950/50">
                                                <Upload className="h-8 w-8 text-slate-500" />
                                                <span className="text-xs text-slate-400 text-center">Upload Front Image</span>
                                            </div>
                                            <div className="border-2 border-dashed border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:border-blue-500/50 transition-colors cursor-pointer bg-slate-950/50">
                                                <Upload className="h-8 w-8 text-slate-500" />
                                                <span className="text-xs text-slate-400 text-center">Upload Back Image</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            onClick={handleSubmitIdentity}
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            disabled={isLoading || !docNumber}
                                        >
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Submit for Identity Verification
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-green-500">
                                            <CheckCircle className="h-6 w-6 mr-2" />
                                            Identity Under Review
                                        </CardTitle>
                                        <CardDescription>We are currently verifying your documents. You can now add skill proofs.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Award className="h-8 w-8 text-yellow-500 mr-3" />
                                                <div>
                                                    <p className="font-bold">Plumbing Expertise</p>
                                                    <p className="text-xs text-slate-500">Add photos of your past work</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" className="border-slate-800">
                                                Add Proof
                                            </Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-500">
                                            Edit Identity Documents
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                            <CardHeader className="bg-blue-600/10 border-b border-slate-800">
                                <CardTitle className="text-sm font-bold flex items-center text-blue-400 uppercase tracking-wider">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Trust Meter
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 text-center space-y-4">
                                <div className="relative inline-flex items-center justify-center">
                                    <svg className="h-32 w-32 rotate-[-90deg]">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-slate-800"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray="364.42"
                                            strokeDashoffset={364.42 * (1 - (step === 1 ? 0.2 : 0.6))}
                                            className="text-blue-500 transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold">{step === 1 ? '1.5' : '4.5'}</span>
                                        <span className="text-[10px] text-slate-500 uppercase">Trust Score</span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Identity Score</span>
                                        <Badge variant="outline" className="h-5 text-[10px] border-slate-800">
                                            {step === 1 ? '0.5/2.0' : '2.0/2.0'}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Skill Score</span>
                                        <Badge variant="outline" className="h-5 text-[10px] border-slate-800">
                                            {step === 1 ? '1.0/3.0' : '2.5/3.0'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-lg space-y-2">
                            <p className="text-xs text-yellow-500 font-bold flex items-center">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Why get verified?
                            </p>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Verified providers get **3x more matching preference** and are eligible for higher-budget emergency jobs.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
