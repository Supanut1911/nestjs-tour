import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user-credential-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    signup(
        @Body() userDto: UserDto
    ) {
        return this.userService.signup(userDto)
    }

    @Post('/signin')
    signIn(
        @Body() userDto: UserDto
    ) {
        return this.userService.signIn(userDto)
    }


}
