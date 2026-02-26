import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum UserRole {
    CUSTOMER = 'CUSTOMER',
    PROVIDER = 'PROVIDER',
    BUSINESS = 'BUSINESS',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 15 })
    @Index()
    phone: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
    role: UserRole;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    email: string;

    // Social Auth Fields
    @Column({ nullable: true })
    googleId: string;

    @Column({ nullable: true })
    facebookId: string;

    @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
    @Index({ spatial: true })
    homeLocation: string;

    @Column({ type: 'int', default: 5000 }) // Default 5km radius for providers
    serviceRadius: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
