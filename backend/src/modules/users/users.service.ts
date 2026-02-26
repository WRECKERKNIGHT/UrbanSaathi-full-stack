import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findByPhone(phone: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { phone } });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async findOrCreateByPhone(phone: string, role: UserRole = UserRole.CUSTOMER): Promise<User> {
        let user = await this.findByPhone(phone);
        if (!user) {
            user = await this.create({ phone, role });
        }
        return user;
    }

    async findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async update(id: string, updateData: Partial<User>): Promise<User> {
        await this.usersRepository.update(id, updateData);
        const user = await this.findOne(id);
        if (!user) throw new Error('User not found');
        return user;
    }
}
