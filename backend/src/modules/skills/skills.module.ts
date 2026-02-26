import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { ProviderSkill } from './entities/provider-skill.entity';
import { SkillProof } from './entities/skill-proof.entity';

import { TrustModule } from '../trust/trust.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProviderSkill, SkillProof]),
        TrustModule,
    ],
    controllers: [SkillsController],
    providers: [SkillsService],
    exports: [SkillsService],
})
export class SkillsModule { }
