import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { JobRequest } from './job-request.entity';
import { User } from '../../users/entities/user.entity';

export enum AssignmentStatus {
    OFFERED = 'OFFERED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    IGNORED = 'IGNORED',
}

@Entity('job_assignments')
export class JobAssignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => JobRequest)
    job: JobRequest;

    @ManyToOne(() => User)
    provider: User;

    @Column({ type: 'enum', enum: AssignmentStatus, default: AssignmentStatus.OFFERED })
    status: AssignmentStatus;

    @Column({ type: 'float', nullable: true })
    matchScore: number;

    @CreateDateColumn()
    createdAt: Date;
}
