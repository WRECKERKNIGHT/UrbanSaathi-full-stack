import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceService } from './finance.service';
import { PaymentTransaction } from './entities/payment-transaction.entity';
import { JobRequest } from '../jobs/entities/job-request.entity';

import { FinanceController } from './finance.controller';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([PaymentTransaction, JobRequest])],
    controllers: [FinanceController],
    providers: [FinanceService],
    exports: [FinanceService],
})
export class FinanceModule { }
