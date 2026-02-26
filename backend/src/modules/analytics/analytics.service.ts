import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobRequest, JobStatus } from '../jobs/entities/job-request.entity';
import { PaymentTransaction, TransactionStatus } from '../finance/entities/payment-transaction.entity';
import { JobAssignment, AssignmentStatus } from '../jobs/entities/job-assignment.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(JobRequest)
        private jobRepository: Repository<JobRequest>,
        @InjectRepository(PaymentTransaction)
        private transactionRepository: Repository<PaymentTransaction>,
        @InjectRepository(JobAssignment)
        private assignmentRepository: Repository<JobAssignment>,
    ) { }

    /**
     * Get overall platform health stats
     */
    async getPlatformStats() {
        const totalJobs = await this.jobRepository.count();
        const completedJobs = await this.jobRepository.count({ where: { status: JobStatus.COMPLETED } });

        const successTransactions = await this.transactionRepository.find({
            where: { status: TransactionStatus.SUCCESS }
        });

        const totalGMV = successTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const totalRevenue = successTransactions.reduce((acc, curr) => acc + Number(curr.platformFee), 0);

        return {
            totalJobs,
            completedJobs,
            completionRate: totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0,
            totalGMV,
            totalRevenue,
            activeUsers: 124, // In a real app, query Users table
        };
    }

    /**
     * Get specific provider performance
     */
    async getProviderAnalytics(providerId: string) {
        const assignments = await this.assignmentRepository.find({
            where: { provider: { id: providerId }, status: AssignmentStatus.ACCEPTED },
            relations: ['job'],
        });

        const completedJobs = assignments.filter(a => a.job.status === JobStatus.COMPLETED);

        return {
            earnings: completedJobs.length * 500, // Simplistic proxy for demo
            jobsCompleted: completedJobs.length,
            rating: 4.8,
        };
    }
}
