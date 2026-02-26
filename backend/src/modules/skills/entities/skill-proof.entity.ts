import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ProviderSkill } from './provider-skill.entity';

export enum ProofType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    CERTIFICATE = 'CERTIFICATE',
    PROJECT_LINK = 'PROJECT_LINK',
}

export enum AdminStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

@Entity('skill_proofs')
export class SkillProof {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ProviderSkill, (skill) => skill.proofs)
    providerSkill: ProviderSkill;

    @Column({ type: 'enum', enum: ProofType })
    type: ProofType;

    @Column()
    url: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', enum: AdminStatus, default: AdminStatus.PENDING })
    adminStatus: AdminStatus;

    @Column({ type: 'text', nullable: true })
    adminFeedback: string;

    @CreateDateColumn()
    createdAt: Date;
}
