import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Workflow } from 'src/workflows/workflow.entity';
import { WorkflowsService } from 'src/workflows/workflows.service';
import { Pipline } from './pipline.entity';
import { PiplineService } from './pipline.service';

@Controller('pipline')
export class PiplineController {

    constructor(
        private readonly piplineService: PiplineService,
        private readonly workflowsService: WorkflowsService
        ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(
        @Body('name') name: string,
        @Body('workflow_id') workflow_id: string
    ): Promise<any> {
        
      const workflow = await this.workflowsService.findOneById(workflow_id);

        if (!workflow) {
            throw new BadRequestException('can not handle workflow_id');
        }

      return await this.piplineService.create(name, workflow);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':workflow_id')
    async getAll(@Param('workflow_id') id: string): Promise<Pipline[]>{
        return await this.piplineService.findManyByWorkflow(id)
    } 

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string): Promise<any> {
        return this.piplineService.delete(id);
    }
}
