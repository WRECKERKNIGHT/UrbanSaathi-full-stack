import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { JobRequest } from '../jobs/entities/job-request.entity';
import { PaymentTransaction } from '../finance/entities/payment-transaction.entity';
import { JobAssignment } from '../jobs/entities/job-assignment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([JobRequest, PaymentTransaction, JobAssignment])],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
    exports: [AnalyticsService],
})
export class AnalyticsModule { }
