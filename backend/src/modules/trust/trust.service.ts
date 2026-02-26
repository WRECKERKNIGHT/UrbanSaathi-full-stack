import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrustScore } from './entities/trust-score.entity';
import { IdentityDocument, VerificationStatus } from './entities/identity-document.entity';

@Injectable()
export class TrustService {
    constructor(
        @InjectRepository(TrustScore)
        private trustScoreRepository: Repository<TrustScore>,
        @InjectRepository(IdentityDocument)
        private identityRepository: Repository<IdentityDocument>,
    ) { }

    async calculateScore(userId: string) {
        let trust = await this.trustScoreRepository.findOne({ where: { userId } });
        if (!trust) {
            trust = this.trustScoreRepository.create({ userId });
        }

        // 1. Identity Verification Score (Max 2.0)
        // - Phone verified: 0.5 (Default if they have an account)
        // - ID Document: 1.5 if VERIFIED
        let identityScore = 0.5;
        const idDoc = await this.identityRepository.findOne({
            where: { user: { id: userId }, status: VerificationStatus.VERIFIED }
        });
        if (idDoc) identityScore += 1.5;

        // 2. Skills Verification (Max 3.0)
        // TODO: Query SkillsService for approved proofs
        const skillScore = 1.0;

        // 3. Performance (Max 5.0)
        // TODO: Query JobsService for completed jobs
        const performanceScore = 0.0;

        const penaltyScore = 0.0;

        trust.identityScore = identityScore;
        trust.skillScore = skillScore;
        trust.performanceScore = performanceScore;
        trust.penaltyScore = penaltyScore;

        trust.overallScore = identityScore + skillScore + performanceScore - penaltyScore;
        trust.lastCalculatedAt = new Date();

        return this.trustScoreRepository.save(trust);
    }

    async submitIdentity(userId: string, data: any) {
        const document = this.identityRepository.create({
            user: { id: userId },
            docType: data.docType,
            docNumber: data.docNumber,
            frontImageUrl: data.frontUrl,
            backImageUrl: data.backUrl,
            status: VerificationStatus.PENDING,
        });
        return this.identityRepository.save(document);
    }

    async verifyIdentity(docId: string, status: VerificationStatus, feedback?: string) {
        const doc = await this.identityRepository.findOne({
            where: { id: docId },
            relations: ['user'],
        });
        if (!doc) throw new Error('Document not found');

        doc.status = status;
        doc.adminFeedback = feedback ?? null;
        await this.identityRepository.save(doc);

        // Recalculate trust score
        if (doc.user?.id) {
            await this.calculateScore(doc.user.id);
        }

        return doc;
    }

    async getScore(userId: string) {
        return this.trustScoreRepository.findOne({ where: { userId } });
    }
}
