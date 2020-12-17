import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../user/get-user-decorator';
import { User } from '../user/user.entity';
import { ProfileDto } from './dto/profile-dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {

    constructor(
        private profileService: ProfileService
    ) {}

    @Patch()
    updateProfile(
        @Body() profileDto: ProfileDto,
        @GetUser() user: User
    ): Promise<Object> {
        return this.profileService.updateProfile(profileDto, user)
    }

    @Get()
    getProfile(
        @GetUser() user: User
    ):Promise<Profile> {
        return this.profileService.getProfile(user)
    }

    @Get('/ya')
    test(
        @GetUser() user: User
    ) {
        console.log('>.', user);
        
    }
}
