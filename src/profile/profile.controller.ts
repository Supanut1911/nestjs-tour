import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user-decorator';
import { User } from '../user/user.entity';
import { ProfileDto } from './dto/profile-dto';
import { ProfileService } from './profile.service';

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
}
