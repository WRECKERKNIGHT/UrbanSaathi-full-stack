import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profession } from './entities/profession.entity';

@Injectable()
export class ProfessionsService implements OnModuleInit {
    constructor(
        @InjectRepository(Profession)
        private professionRepository: Repository<Profession>,
    ) { }

    async onModuleInit() {
        const count = await this.professionRepository.count();
        if (count === 0) {
            await this.create({ name: 'Plumber', description: 'Plumbing services', baseServiceCharge: 500 });
            await this.create({ name: 'Electrician', description: 'Electrical services', baseServiceCharge: 600 });
            await this.create({ name: 'Carpenter', description: 'Woodworking services', baseServiceCharge: 700 });
            console.log('Seed: Created initial professions');
        }
    }

    async findAll() {
        return this.professionRepository.find();
    }

    async create(data: Partial<Profession>) {
        const profession = this.professionRepository.create(data);
        return this.professionRepository.save(profession);
    }

    async findOne(id: number) {
        return this.professionRepository.findOne({ where: { id } });
    }
}
