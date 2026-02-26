import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Profession } from '../../professions/entities/profession.entity';
import { SkillProof } from './skill-proof.entity';

@Entity('provider_skills')
export class ProviderSkill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    provider: User;

    @ManyToOne(() => Profession, (profession) => profession.providerSkills)
    profession: Profession;

    @Column({ type: 'int', default: 0 })
    experienceYears: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    hourlyRate: number;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ type: 'float', default: 0.0 })
    skillTrustScore: number;

    @OneToMany(() => SkillProof, (proof) => proof.providerSkill)
    proofs: SkillProof[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
