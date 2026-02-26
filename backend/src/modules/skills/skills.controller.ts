import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }

    @Post()
    async addSkill(@Body() body: any) {
        return this.skillsService.createSkill(body);
    }

    @Get('my-skills')
    async getMySkills(@Request() req) {
        // Note: In real app, req.user.userId comes from JwtGuard
        return this.skillsService.getProviderSkills(req.user.userId);
    }
}
