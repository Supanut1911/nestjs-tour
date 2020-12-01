import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Profile } from "../profile/profile.entity";

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

}
