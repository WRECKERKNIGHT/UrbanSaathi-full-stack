import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { MatchingService } from './matching.service';
import { JobsController } from './jobs.controller';
import { JobRequest } from './entities/job-request.entity';
import { JobAssignment } from './entities/job-assignment.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([JobRequest, JobAssignment, User])],
    controllers: [JobsController],
    providers: [JobsService, MatchingService],
    exports: [JobsService, MatchingService],
})
export class JobsModule { }
