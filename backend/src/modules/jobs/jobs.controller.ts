import { Controller, Post, Body, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobStatus } from './entities/job-request.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createJob(@Request() req, @Body() body: any) {
        return this.jobsService.createJob(req.user.userId, body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('history')
    async getHistory(@Request() req) {
        return this.jobsService.getHistory(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('provider/work')
    async getProviderWork(@Request() req) {
        return this.jobsService.getProviderWork(req.user.userId);
    }

    @Get(':id')
    async getJobDetails(@Param('id') id: string) {
        return this.jobsService.getJobDetails(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Body('status') status: JobStatus) {
        return this.jobsService.updateStatus(id, status);
    }

    @UseGuards(JwtAuthGuard)
    @Post('assignments/:id/accept')
    async acceptAssignment(@Param('id') assignmentId: string, @Request() req) {
        return this.jobsService.acceptAssignment(assignmentId, req.user.userId);
    }
}

