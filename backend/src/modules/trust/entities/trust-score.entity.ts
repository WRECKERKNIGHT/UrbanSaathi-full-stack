import { Entity, PrimaryColumn, Column, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('trust_scores')
export class TrustScore {
    @PrimaryColumn('uuid')
    userId: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column('float', { default: 0.0 })
    overallScore: number;

    @Column('float', { default: 0.0 })
    identityScore: number;

    @Column('float', { default: 0.0 })
    skillScore: number;

    @Column('float', { default: 0.0 })
    performanceScore: number;

    @Column('float', { default: 0.0 })
    penaltyScore: number;

    @UpdateDateColumn()
    lastCalculatedAt: Date;
}
