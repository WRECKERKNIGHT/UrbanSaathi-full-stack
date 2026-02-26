import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum DocumentType {
    AADHAAR = 'AADHAAR',
    VOTER_ID = 'VOTER_ID',
    DRIVING_LICENSE = 'DRIVING_LICENSE',
}

export enum VerificationStatus {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    REJECTED = 'REJECTED',
}

@Entity('identity_documents')
export class IdentityDocument {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column({ type: 'enum', enum: DocumentType })
    docType: DocumentType;

    @Column({ nullable: true })
    docNumber: string; // Masked or encrypted in production

    @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.PENDING })
    status: VerificationStatus;

    @Column()
    frontImageUrl: string;

    @Column({ nullable: true })
    backImageUrl: string;

    @Column({ type: 'text', nullable: true })
    adminFeedback: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
