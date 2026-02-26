import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('send-otp')
    @HttpCode(HttpStatus.OK)
    async sendOtp(@Body() body: { phone: string }) {
        // Mock sending OTP logic
        return { message: 'OTP sent successfully (Use 123456 for dev)' };
    }

    @Post('login-otp')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: { phone: string; otp: string }) {
        const user = await this.authService.validateOtp(body.phone, body.otp);
        return this.authService.login(user);
    }
}
