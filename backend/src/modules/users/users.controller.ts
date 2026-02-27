import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('provider/:id')
    async getProviderProfile(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
}


