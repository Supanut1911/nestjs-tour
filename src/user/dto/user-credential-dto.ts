import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { Entity } from "typeorm"

@Entity()
export class UserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'username'
    })
    username: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'password'
    })
    password: string
}