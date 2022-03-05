import { Pipline } from "src/pipline/pipline.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Statge } from "../statges/statge.entity";
import { User } from "../users/user.entity";

@Entity()
export class Workflow{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @OneToMany(() => User, user => user.workflow, {onDelete: "CASCADE"})
    users: User[];

    @OneToMany(() => Statge, statge => statge.workflow, {onDelete: "CASCADE"})
    statges: Statge[];

    @OneToMany(() => Pipline, pipline => pipline.workflow, {onDelete: "CASCADE"})
    piplines: Statge[];

   
}