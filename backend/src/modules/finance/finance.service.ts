import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentTransaction, TransactionStatus } from './entities/payment-transaction.entity';
import { JobRequest, PaymentStatus } from '../jobs/entities/job-request.entity';

@Injectable()
export class FinanceService {
    private readonly logger = new Logger(FinanceService.name);
    private readonly COMMISSION_RATE = 0.10; // 10% Platform Fee

    constructor(
        @InjectRepository(PaymentTransaction)
        private transactionRepository: Repository<PaymentTransaction>,
        @InjectRepository(JobRequest)
        private jobRepository: Repository<JobRequest>,
    ) { }

    /**
     * Initiates a payment session
     */
    async createPaymentSession(jobId: string, amount: number) {
        this.logger.log(`Creating payment session for job ${jobId} with amount ${amount}`);

        const job = await this.jobRepository.findOne({ where: { id: jobId } });
        if (!job) throw new NotFoundException('Job not found');

        const platformFee = amount * this.COMMISSION_RATE;

        const transaction = this.transactionRepository.create({
            job,
            amount,
            platformFee,
            status: TransactionStatus.PENDING,
        });

        await this.transactionRepository.save(transaction);

        // In a real app, this would return a Stripe/Razorpay session URL
        return {
            checkoutUrl: `http://localhost:3000/checkout?jobId=${jobId}&amount=${amount}`,
            transactionId: transaction.id,
        };
    }

    /**
     * Confirms successful payment (Simulating Webhook)
     */
    async confirmPayment(transactionId: string, gatewayId: string) {
        const transaction = await this.transactionRepository.findOne({
            where: { id: transactionId },
            relations: ['job'],
        });

        if (!transaction) throw new NotFoundException('Transaction not found');

        transaction.status = TransactionStatus.SUCCESS;
        transaction.gatewayTransactionId = gatewayId;
        await this.transactionRepository.save(transaction);

        // Update job payment status to ESCROWED
        const job = transaction.job;
        job.paymentStatus = PaymentStatus.ESCROWED;
        job.totalBudget = transaction.amount;
        await this.jobRepository.save(job);

        this.logger.log(`Payment confirmed for job ${job.id}. Funds in Escrow.`);
        return { success: true, status: job.paymentStatus };
    }

    /**
     * Releases funds from escrow to provider
     */
    async releaseEscrow(jobId: string) {
        const job = await this.jobRepository.findOne({ where: { id: jobId } });
        if (!job) return;

        if (job.paymentStatus === PaymentStatus.ESCROWED) {
            job.paymentStatus = PaymentStatus.RELEASED;
            await this.jobRepository.save(job);
            this.logger.log(`Funds released to provider for job ${jobId}`);
        }
    }
}
