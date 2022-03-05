import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './workflow.entity';
import { Statge } from 'src/statges/statge.entity';

@Module({
  exports: [WorkflowsService],
  imports: [TypeOrmModule.forFeature([Workflow, Statge ])],
  providers: [WorkflowsService],
  controllers: [WorkflowsController]
})
export class WorkflowsModule {}
