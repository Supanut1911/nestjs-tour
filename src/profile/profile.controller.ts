import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user-decorator';
import { User } from '../user/user.entity';
import { ProfileDto } from './dto/profile-dto';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
    @Get()
    getProfile() {

    }

    @Post()
    createProfile(
        @Body() profileDto: ProfileDto,
        @GetUser() user: User
    ) {
        console.log(user);
        
    }
}
