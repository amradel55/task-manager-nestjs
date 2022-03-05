import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Workflow } from 'src/workflows/workflow.entity';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get('workflow/:workflow_id')
   async getUsersByworkflow(@Param('workflow_id') workflow_id: string){
        return await this.usersService.findAll(workflow_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User>{
        return await this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('pipeline/:pipeline_id')
    getUsersWithTasks(@Param('pipeline_id') id: string): Promise<User[]> {
        return this.usersService.findAllWithTasks(id);
    }

    @Post('register')
    async create(
        @Body('name') name: string,
        @Body('user_name') user_name: string,
        @Body('password') password: string,
        @Body('workflow_id') workflow: Workflow
        ){
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User()
            user.name = name;
            user.user_name = user_name;
            user.password = hashedPassword;
            user.workflow = workflow;
            return await this.usersService.create(user);
        }

    

}
