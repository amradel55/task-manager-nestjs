import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workflow } from 'src/workflows/workflow.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}


     async create({name ,user_name, password, workflow}): Promise<any>{
        const user = this.usersRepository.create({name, user_name, password, workflow});
        return this.usersRepository.save(user);
      }

      findAll(condtion: string): Promise<User[]> {
        return this.usersRepository.find({
          where: {
            workflow: condtion
          }});
      }

      findAllWithTasks(pipeline_id: string){
        return this.usersRepository.createQueryBuilder('user')
          .leftJoinAndSelect('user.tasks', 'task')
          .leftJoinAndSelect('task.statge', 'statge')
          .leftJoinAndSelect('task.user', 'user_')
          .where('task.pipeline = :id' , {id: pipeline_id})
          .getMany();
      }

      findOne(condition: any, relation?: string[]): Promise<User | undefined> {
        return this.usersRepository.findOne(condition,{relations: relation});
      }

      findUserWithPass(user_name: string): Promise<User | undefined>{
          return  this.usersRepository.createQueryBuilder('user')
          .addSelect('user.password')
          .where("user.user_name = :user_name", {user_name})
          .getOne();
      }

      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }
      
}
