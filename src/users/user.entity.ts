import { Statge } from 'src/statges/statge.entity';
import { Task } from 'src/tasks/task.entity';
import { Workflow } from 'src/workflows/workflow.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({unique: true})
  user_name: string;

 @Column({select: false})
 password: string;

 @ManyToOne(() => Workflow, workflow => workflow.users)
 workflow: Workflow;


  @OneToMany(() => Task, task => task.user, {onDelete: "CASCADE"})
  tasks: Task[]

 
}