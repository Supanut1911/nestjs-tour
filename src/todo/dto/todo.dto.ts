import { IsIn, IsOptional, IsString } from "class-validator";

export class TodoDto {

    @IsString()
    todotopic: string

    @IsString()
    description: string
}