import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Workflow } from 'src/workflows/workflow.entity';
import { Statge } from './statge.entity';
import { StatgesService } from './statges.service';

@Controller('statges')
export class StatgesController {

    constructor(private readonly statgesService: StatgesService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':workflow_id')
    getStatgesByWorkflow(@Param('workflow_id') Workflow: string): Promise<Statge[]> {
        return this.statgesService.findAll(Workflow);

    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    removeStatge(@Param('id') id: string){
        return this.statgesService.delete(id);
    }
}
