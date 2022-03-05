import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statge } from 'src/statges/statge.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Workflow } from './workflow.entity';

@Injectable()
export class WorkflowsService {

    constructor (
        @InjectRepository(Workflow)
        private workflowRepository: Repository<Workflow>,

        @InjectRepository(Statge)
        private statgeRepository: Repository<Statge>
    ) {}

    async create(
        name: string,
        users: User[],
        statges: Statge[]
    ): Promise<any> {
        const workflow = this.workflowRepository.create({
            name,
            users,
            statges
        });

        return this.workflowRepository.save(workflow);
    }

    async findOneById(id: string): Promise<Workflow | undefined> {
        return await this.workflowRepository.findOne(id, {relations: ['statges']});
    }

    async updateStatges(statge: Statge, workflow_id: string): Promise<Statge> {
       const workflow_ = await this.findOneById(workflow_id);
       
       if (!workflow_) {
           throw new NotFoundException("can't resolve workflow id")
       }

        const statge_ =  this.statgeRepository.create(statge);
        statge_.workflow = workflow_;

       return await this.statgeRepository.save(statge_);
    }

    
}
