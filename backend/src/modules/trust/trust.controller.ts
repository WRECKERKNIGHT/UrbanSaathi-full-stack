import { Controller, Get, Param, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TrustService } from './trust.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VerificationStatus, DocumentType } from './entities/identity-document.entity';

@Controller('trust')
export class TrustController {
    constructor(private readonly trustService: TrustService) { }

    @Get('score/:userId')
    @UseGuards(JwtAuthGuard)
    getScore(@Param('userId') userId: string) {
        return this.trustService.getScore(userId);
    }

    @Post('identity/submit')
    @UseGuards(JwtAuthGuard)
    async submitIdentity(@Req() req: any, @Body() body: { docType: DocumentType, docNumber: string, frontUrl: string, backUrl?: string }) {
        const userId = req.user.sub;
        // In a real app, this would trigger OCR
        return this.trustService.submitIdentity(userId, body);
    }

    // Admin endpoint to verify (SIMULATED)
    @Post('identity/verify/:docId')
    @UseGuards(JwtAuthGuard)
    async verifyIdentity(@Param('docId') docId: string, @Body() body: { status: VerificationStatus, feedback?: string }) {
        return this.trustService.verifyIdentity(docId, body.status, body.feedback);
    }
}
