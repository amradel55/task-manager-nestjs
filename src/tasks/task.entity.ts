import { Pipline } from "src/pipline/pipline.entity";
import { Statge } from "src/statges/statge.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";


@Entity()
export class Task{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    date: string;

    @Column()
    description: string;

    @Column()
    color: string;

    @ManyToOne(() => Statge, statge => statge.tasks)
    statge: Statge;

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @ManyToOne(() => Pipline, pipeline => pipeline.tasks)
    pipeline: Pipline;
   
}