import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workflow } from 'src/workflows/workflow.entity';
import { Repository } from 'typeorm';
import { Statge } from './statge.entity';

@Injectable()
export class StatgesService {

    constructor(
        @InjectRepository(Statge)
        private statgeRespository: Repository<Statge>
    ) {}

    findAll(id: string): Promise<Statge[]> {        
        return this.statgeRespository.find({
            where: {
                workflow: {
                    id : id
                }
            }
        });
    }

    delete(id: string): Promise<any> {
        return this.statgeRespository.delete(id)
    }

}
