import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Profile } from "../profile/profile.entity";
import { Todo } from "../todo/todo.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    profileId: string
    @OneToOne(type => Profile)
    @JoinColumn({name: 'profileId'})
    profile: Profile

    @OneToMany(type => Todo, todo => todo.user, { eager: true, cascade: true })
    todos: Todo[]
}
