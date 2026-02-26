import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Profession } from '../../professions/entities/profession.entity';

export enum JobStatus {
    OPEN = 'OPEN',
    MATCHING = 'MATCHING',
    ACCEPTED = 'ACCEPTED',
    ON_WAY = 'ON_WAY',
    STARTED = 'STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    DISPUTED = 'DISPUTED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    ESCROWED = 'ESCROWED',
    RELEASED = 'RELEASED',
    REFUNDED = 'REFUNDED',
}

@Entity('job_requests')
export class JobRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    customer: User;

    @ManyToOne(() => Profession)
    profession: Profession;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
    location: string;

    @Column({ type: 'enum', enum: JobStatus, default: JobStatus.OPEN })
    status: JobStatus;

    @Column({ default: false })
    emergencyMode: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalBudget: number;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    paymentStatus: PaymentStatus;

    @Column({ type: 'timestamp', nullable: true })
    scheduledAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
