import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Statge } from 'src/statges/statge.entity';
import { User } from 'src/users/user.entity';
import { Workflow } from './workflow.entity';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {

    constructor(private readonly workflowsService: WorkflowsService) {}

    @Post('create')
    async create(
        @Body('name') name: string,
        @Body('users') users: User[],
        @Body('statges') statges: Statge[]
    ): Promise<any> {
        return await this.workflowsService.create(name,users, statges);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getWorkflowById(@Param('id') id: string): Promise<Workflow>{
        return await this.workflowsService.findOneById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('addStatge/:id') // id here for workflow
    async updateStatages(
        @Param('id') id: string,
        @Body('statge') statge: Statge
        ) : Promise<any> {
            return await this.workflowsService.updateStatges(statge, id);
        }

}
