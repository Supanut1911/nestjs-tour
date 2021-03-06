import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { User } from '../user/user.entity';
import { ProfileDto } from './dto/profile-dto';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(Profile)
        private profileRepository: ProfileRepository
    ) {}

    private async findById(
        user: User
    ) {
        
        let found = await this.profileRepository.findOne({ where: {id: user.profileId} })
        if(!found) {
            throw new InternalServerErrorException()
        } 
        return found
    }

    async updateProfile(
        profileDto: ProfileDto,
        user: User
    ): Promise<Object> {
        let {fname, lname, age} = profileDto
        try {
            let profile = await this.findById(user)
            profile.fname = fname
            profile.lname = lname
            profile.age = age
            await profile.save()

            return {
                message: 'update success'
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProfile(
        user: User
    ): Promise<Profile> {
        try {
            // let profile = await this.profileRepository.findOne( user.profileId )
            let profileRepository = getRepository(Profile)
            let profile = await profileRepository.findOne( user.profileId)
            if(!profile) {
                throw new NotFoundException()
            }
            return profile
        } catch (error) {
            console.log(error.message);
        }
    }
}
