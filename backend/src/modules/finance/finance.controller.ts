import { Controller, Post, Body, Get, Query, UseGuards, Req } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('finance')
export class FinanceController {
    constructor(private financeService: FinanceService) { }

    @Post('confirm-payment')
    async confirmPayment(@Body() body: { transactionId: string; gatewayId: string }) {
        return this.financeService.confirmPayment(body.transactionId, body.gatewayId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('initiate-payment')
    async initiate(@Body() body: { jobId: string; amount: number }) {
        return this.financeService.createPaymentSession(body.jobId, body.amount);
    }
}
