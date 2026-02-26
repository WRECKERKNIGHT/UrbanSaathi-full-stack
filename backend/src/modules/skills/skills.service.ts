import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderSkill } from './entities/provider-skill.entity';
import { SkillProof, AdminStatus } from './entities/skill-proof.entity';
import { TrustService } from '../trust/trust.service';

@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(ProviderSkill)
        private providerSkillRepository: Repository<ProviderSkill>,
        @InjectRepository(SkillProof)
        private skillProofRepository: Repository<SkillProof>,
        private trustService: TrustService,
    ) { }

    async createSkill(data: Partial<ProviderSkill>) {
        const skill = this.providerSkillRepository.create(data);
        return this.providerSkillRepository.save(skill);
    }

    async addProof(skillId: string, proofData: Partial<SkillProof>) {
        const proof = this.skillProofRepository.create({
            ...proofData,
            providerSkill: { id: skillId } as ProviderSkill,
        });
        return this.skillProofRepository.save(proof);
    }

    async approveProof(proofId: string) {
        const proof = await this.skillProofRepository.findOne({
            where: { id: proofId },
            relations: ['providerSkill', 'providerSkill.provider'],
        });
        if (!proof) throw new NotFoundException('Proof not found');

        proof.adminStatus = AdminStatus.APPROVED;
        await this.skillProofRepository.save(proof);

        // Recalculate trust score for the provider
        if (proof.providerSkill?.provider?.id) {
            await this.trustService.calculateScore(proof.providerSkill.provider.id);
        }

        return proof;
    }

    async getProviderSkills(providerId: string) {
        return this.providerSkillRepository.find({
            where: { provider: { id: providerId } },
            relations: ['profession', 'proofs'],
        });
    }
}
