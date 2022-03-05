import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/task.entity";
import { Workflow } from "../workflows/workflow.entity";

@Entity()
export class Statge{


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Workflow, workflow => workflow.statges)
    workflow: Workflow

  
    @OneToMany(() => Task, task => task.statge)
    tasks: Task[];


}