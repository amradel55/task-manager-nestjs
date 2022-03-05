import { Task } from "src/tasks/task.entity";
import { Workflow } from "src/workflows/workflow.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Pipline{


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Workflow, workflow => workflow.piplines)
    workflow: Workflow;

    @OneToMany(() => Task, task => task.pipeline)
    tasks: Task[];

}