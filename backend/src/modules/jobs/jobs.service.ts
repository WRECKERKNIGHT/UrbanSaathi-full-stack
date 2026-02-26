import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobRequest, JobStatus } from './entities/job-request.entity';
import { JobAssignment, AssignmentStatus } from './entities/job-assignment.entity';
import { MatchingService } from './matching.service';
import { NotificationsService } from '../notifications/notifications.service';
import { FinanceService } from '../finance/finance.service';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(JobRequest)
        private jobRequestRepository: Repository<JobRequest>,
        @InjectRepository(JobAssignment)
        private jobAssignmentRepository: Repository<JobAssignment>,
        private matchingService: MatchingService,
        private notificationsService: NotificationsService,
        private financeService: FinanceService,
    ) { }

    async createJob(customerId: string, data: any) {
        const job = this.jobRequestRepository.create({
            ...data,
            customer: { id: customerId },
            status: JobStatus.OPEN,
        });
        const savedJob = await this.jobRequestRepository.save(job) as unknown as JobRequest;

        // Create a payment session automatically or return it
        const session = await this.financeService.createPaymentSession(savedJob.id, 500); // Defaulting for simple flow

        // Trigger matching engine in the background
        this.matchingService.triggerMatching(savedJob.id).catch(err => {
            console.error('Error in matching engine:', err);
        });

        return { ...savedJob, checkoutUrl: session.checkoutUrl };
    }

    async updateStatus(jobId: string, status: JobStatus) {
        const job = await this.jobRequestRepository.findOne({ where: { id: jobId } });
        if (!job) throw new NotFoundException('Job not found');
        job.status = status;

        if (status === JobStatus.COMPLETED) {
            await this.financeService.releaseEscrow(jobId);
        }

        return this.jobRequestRepository.save(job);
    }

    async getJobDetails(id: string) {
        return this.jobRequestRepository.findOne({
            where: { id },
            relations: ['customer', 'profession'],
        });
    }

    async acceptAssignment(assignmentId: string, providerId: string) {
        const assignment = await this.jobAssignmentRepository.findOne({
            where: { id: assignmentId, provider: { id: providerId } },
            relations: ['job', 'job.customer', 'provider'],
        });
        if (!assignment) throw new NotFoundException('Assignment not found');

        assignment.status = AssignmentStatus.ACCEPTED;
        await this.jobAssignmentRepository.save(assignment);

        // Update job status to matched/accepted
        await this.updateStatus(assignment.job.id, JobStatus.ACCEPTED);

        // Notify customer
        if (assignment.job.customer) {
            this.notificationsService.emitToUser(assignment.job.customer.id, 'ASSIGNMENT_ACCEPTED', {
                jobId: assignment.job.id,
                providerName: assignment.provider.phone, // TODO: Use real name when available
                providerId: assignment.provider.id,
            });
        }

        return assignment;
    }

    async getHistory(userId: string) {
        return this.jobRequestRepository.find({
            where: { customer: { id: userId } },
            relations: ['profession', 'assignments', 'assignments.provider'],
            order: { createdAt: 'DESC' }
        });
    }

    async getProviderWork(providerId: string) {
        return this.jobAssignmentRepository.find({
            where: { provider: { id: providerId } },
            relations: ['job', 'job.profession', 'job.customer'],
            order: { createdAt: 'DESC' }
        });
    }
}

