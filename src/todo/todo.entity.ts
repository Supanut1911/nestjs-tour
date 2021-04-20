import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { TodoStatus } from "./todo.enum";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    todotopic: string

    @Column()
    description: string

    @Column()
    status: TodoStatus

    @Column({
        nullable: true
    })
    createBy: string 
    @ManyToOne(type => User, user => user.todos, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'createBy'})
    user: User
}