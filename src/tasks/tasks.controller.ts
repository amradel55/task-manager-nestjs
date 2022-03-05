import { Body, Controller, Delete, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Pipline } from 'src/pipline/pipline.entity';
import { Statge } from 'src/statges/statge.entity';
import { User } from 'src/users/user.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksServices: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(
        @Body('title') name: string,
        @Body('pipeline') pipeline: Pipline,
        @Body('description') desc: string,
        @Body('color') color: string,
        @Body('statge') statge: Statge,
        @Body('user') user: User,
    ): Promise<any>{
        return await this.tasksServices.create(name, pipeline, desc, color, statge ,user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body('title') name: string,
        @Body('description')  description: string,
        @Body('color') color: string,
        @Body('statge') statge: Statge,
        @Body('user') user: string
    ) : Promise<any> {
        return await this.tasksServices.update({
            id,
            name,
            description,
            color,
            user,
            statge
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any>{
        await this.tasksServices.remove(id);
        return {
            message: 'the task deleted',
        }
    }
}
