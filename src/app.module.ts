import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { PiplineModule } from './pipline/pipline.module';
import { StatgesModule } from './statges/statges.module';
import config from '../ormconfig';

@Module({

  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    TasksModule,
    WorkflowsModule,
    PiplineModule,
    StatgesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection){}
}
