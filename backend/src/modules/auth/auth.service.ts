import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateOtp(phone: string, otp: string): Promise<any> {
        // Mock OTP logic: Always accept 123456
        if (otp !== '123456') {
            throw new UnauthorizedException('Invalid OTP');
        }

        const user = await this.usersService.findOrCreateByPhone(phone);
        return user;
    }

    async login(user: any) {
        const payload = { sub: user.id, phone: user.phone, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
