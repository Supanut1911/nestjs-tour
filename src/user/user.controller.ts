import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user-credential-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getUser() {
        return this.userService.getusers()
    }

    @Get('/id')
    getUserbyId() {

    }

    @Post()
    createuser(
        @Body() userDto: UserDto
    ) {
        return this.userService.createUser(userDto)
    }


}
