import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('platform')
    // @Roles('ADMIN', 'BUSINESS') // Assuming roles are handled
    getPlatformStats() {
        return this.analyticsService.getPlatformStats();
    }

    @Get('provider/:providerId')
    getProviderStats(@Param('providerId') providerId: string) {
        return this.analyticsService.getProviderAnalytics(providerId);
    }
}
