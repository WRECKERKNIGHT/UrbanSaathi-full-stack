import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProviderSkill } from '../../skills/entities/provider-skill.entity';

@Entity('professions')
export class Profession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  baseServiceCharge: number;

  @Column({ type: 'jsonb', nullable: true })
  metadataSchema: any; // Defines custom fields/proofs required

  @OneToMany(() => ProviderSkill, (skill) => skill.profession)
  providerSkills: ProviderSkill[];
}
