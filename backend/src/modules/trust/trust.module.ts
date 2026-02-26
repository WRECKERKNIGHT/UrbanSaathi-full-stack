import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrustService } from './trust.service';
import { TrustController } from './trust.controller';
import { TrustScore } from './entities/trust-score.entity';
import { IdentityDocument } from './entities/identity-document.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TrustScore, IdentityDocument])],
    controllers: [TrustController],
    providers: [TrustService],
    exports: [TrustService],
})
export class TrustModule { }
