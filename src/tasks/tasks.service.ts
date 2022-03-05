import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pipline } from 'src/pipline/pipline.entity';
import { Statge } from 'src/statges/statge.entity';
import { User } from 'src/users/user.entity';
import { Pipe } from 'stream';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
    private tasksRepository: Repository<Task>
    ){}

    async create(
         name: string,
         pipeline: Pipline, 
         description: string, 
         color: string,
         statge: Statge,
         user: User): Promise<any> {
            
        const task = this.tasksRepository.create({name, description, color, statge, user, pipeline})

        return this.tasksRepository.save(task);

    }

    findAll(id: string): Promise<Task[]>{
        return this.tasksRepository.find({
            where: {
                user: {
                    id: id,
                }
            }
        });
    }

    findOne(condtion: any): Promise<Task | undefined>{
        return this.tasksRepository.findOne(condtion);
    }

    async update({id, name, description, color, user ,statge}): Promise<any> {
        let task =  await this.findOne(id);
        
        if (!task) {
            throw new NotFoundException("The task id not found!");
        }

        task.name = name ? name : task.name;
        task.description = description ? description : task.description;
        task.color = color ? color : task.color;
        task.statge = statge ? statge : task.statge;
        task.user = user ? user : task.user;
        return  this.tasksRepository.save(task);

    }

    async remove(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
      }

    
}
