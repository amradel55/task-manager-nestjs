import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { Statge } from './statges/statge.entity';
import { Workflow } from './workflows/workflow.entity';
import { WorkflowsModule } from './workflows/workflows.module';
import { PiplineModule } from './pipline/pipline.module';
import { Pipline } from './pipline/pipline.entity';
import { StatgesModule } from './statges/statges.module';


@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'taskManager_db',
      entities: [User, Task, Statge, Workflow, Pipline],
      synchronize: false,
    }),
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
