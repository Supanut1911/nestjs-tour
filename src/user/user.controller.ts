import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileDto } from '../profile/dto/profile-dto';
import { Profile } from '../profile/profile.entity';
import { UserDto } from './dto/user-credential-dto';
import { GetUser } from './get-user-decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/signup')
    signup(
        @Body() userDto: UserDto,
        @Body() profileDto: ProfileDto
    ) {
        return this.userService.signup(userDto, profileDto)
    }

    @Post('/signin')
    signIn(
        @Body() userDto: UserDto
    ) {
        console.log('yayaa');
        
        return this.userService.signIn(userDto)
    }

    @Delete('/:id')
    deleteUser(
        @Param('id') id: string,
    ):Promise<string> {
        return this.userService.deleteUser(id)
    }

    @Get('/ya')
    test(
        @GetUser() user: User
    ) {
        console.log(user);
        
    }   
}
