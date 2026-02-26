import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobRequest, JobStatus } from './entities/job-request.entity';
import { JobAssignment, AssignmentStatus } from './entities/job-assignment.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MatchingService {
    private readonly logger = new Logger(MatchingService.name);

    constructor(
        @InjectRepository(JobRequest)
        private jobRequestRepository: Repository<JobRequest>,
        @InjectRepository(JobAssignment)
        private jobAssignmentRepository: Repository<JobAssignment>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private notificationsService: NotificationsService,
    ) { }

    /**
     * Finds suitable providers and creates job assignments
     * Logic:
     * 1. Match Profession
     * 2. Geographic distance (within provider's service radius)
     * 3. Rank by proximity and trust scores (future improvement)
     */
    async triggerMatching(jobId: string) {
        this.logger.log(`Starting matching for job: ${jobId}`);

        const job = await this.jobRequestRepository.findOne({
            where: { id: jobId },
            relations: ['profession'],
        });

        if (!job || !job.location) {
            this.logger.warn(`Job ${jobId} not found or has no location.`);
            return;
        }

        // Query providers using spatial functions
        // ST_DWithin(geom1, geom2, distance_meters)
        const providers = await this.userRepository
            .createQueryBuilder('user')
            .innerJoin('provider_skills', 'ps', 'ps.providerId = user.id')
            .where('user.role = :role', { role: UserRole.PROVIDER })
            .andWhere('user.isActive = :isActive', { isActive: true })
            .andWhere('ps.professionId = :professionId', { professionId: job.profession.id })
            .andWhere(
                'ST_DWithin(user.homeLocation, ST_GeomFromText(:jobLocation, 4326), user.serviceRadius)',
                { jobLocation: job.location }
            )
            .getMany();

        this.logger.log(`Found ${providers.length} potential providers for job ${jobId}`);

        const assignments = providers.map(provider => {
            return this.jobAssignmentRepository.create({
                job,
                provider,
                status: AssignmentStatus.OFFERED,
                matchScore: 100, // TODO: Implement multi-factor scoring algorithm
            });
        });

        if (assignments.length > 0) {
            await this.jobAssignmentRepository.save(assignments);

            // Notify providers in real-time
            providers.forEach(provider => {
                this.notificationsService.emitToUser(provider.id, 'NEW_JOB_OFFER', {
                    jobId: job.id,
                    profession: job.profession.name,
                    location: job.location,
                    emergency: job.emergencyMode,
                });
            });

            // Update job status to MATCHING
            job.status = JobStatus.MATCHING;
            await this.jobRequestRepository.save(job);
        } else {
            this.logger.warn(`No providers found for job ${jobId} within their service radius`);
        }
    }
}
