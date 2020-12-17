import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString } from "class-validator";

export class TodoDto {

    @IsString()
    @ApiProperty({ type: String, description: 'topic'})
    todotopic: string

    @IsString()
    @ApiProperty({ type: String, description: 'description'})
    description: string
}