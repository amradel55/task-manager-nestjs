import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsModule } from 'src/workflows/workflows.module';
import { PiplineController } from './pipline.controller';
import { Pipline } from './pipline.entity';
import { PiplineService } from './pipline.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pipline]),WorkflowsModule],
  controllers: [PiplineController],
  providers: [PiplineService]
})
export class PiplineModule {}
