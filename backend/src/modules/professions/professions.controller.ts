import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfessionsService } from './professions.service';

@Controller('professions')
export class ProfessionsController {
    constructor(private readonly professionsService: ProfessionsService) { }

    @Get()
    findAll() {
        return this.professionsService.findAll();
    }

    @Post()
    create(@Body() body: any) {
        return this.professionsService.create(body);
    }
}
