import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JobRequest } from '../../jobs/entities/job-request.entity';

export enum TransactionStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}

@Entity('payment_transactions')
export class PaymentTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => JobRequest)
    job: JobRequest;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    platformFee: number;

    @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
    status: TransactionStatus;

    @Column({ nullable: true })
    gatewayTransactionId: string;

    @Column({ type: 'jsonb', nullable: true })
    metaData: any;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
