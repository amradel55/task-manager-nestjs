import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statge } from 'src/statges/statge.entity';
import { Workflow } from 'src/workflows/workflow.entity';
import { Repository } from 'typeorm';
import { Pipline } from './pipline.entity';

@Injectable()
export class PiplineService {

    constructor(
        @InjectRepository(Pipline)
        private piplineRespository: Repository<Pipline>,
    ) {}

    async create(
        name: string,
        workflow: Workflow
            ): Promise<any> {
        const pipline = this.piplineRespository.create({name, workflow});
        return this.piplineRespository.save(pipline);
    }

    async findOneById(id: string): Promise<Pipline | undefined > {
        return await this.piplineRespository.findOne(id, {
            relations: [
                'workflow'
            ]
        });
    }

    async findManyByWorkflow(workflow: string): Promise<Pipline[]> {
        
        return await this.piplineRespository.find({
            where: {
                workflow: {
                    id : workflow
                }
            },
            });
    }

    async delete(id: string): Promise<any> {
        return await this.piplineRespository.delete(id);
    }

}
