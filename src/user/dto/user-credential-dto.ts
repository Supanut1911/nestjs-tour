import { IsNotEmpty, IsString } from "class-validator"
import { Entity } from "typeorm"

@Entity()
export class UserDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}