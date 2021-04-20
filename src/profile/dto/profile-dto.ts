import { ApiProperty } from "@nestjs/swagger"

export class ProfileDto  {
    @ApiProperty({
        type: String,
    })
    fname: string

    @ApiProperty({
        type: String,
    })
    lname: string

    @ApiProperty({
        type: Number,
    })
    age: number
}