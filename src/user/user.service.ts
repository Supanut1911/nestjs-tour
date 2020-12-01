import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user-credential-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Profile } from '../profile/profile.entity';
import { ProfileDto } from '../profile/dto/profile-dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(userDto: UserDto, profileDto: ProfileDto): Promise<void> {
        let { username, password } = userDto
        let salt = await bcrypt.genSalt()

        let newUser = new User()
        newUser.username = username
        newUser.password = await this.hashPassword(password, salt)
    
        console.log(profileDto);
        

        let profile = new Profile()
        profile.username = username
        profile.fname = profileDto.fname
        profile.lname = profileDto.lname
        profile.age = profileDto.age

        newUser.profile = profile

        try {
            await profile.save()
            await newUser.save()
        } catch (error) {
            if(error.code == '23505') {
                throw new ConflictException('user are already exist')
            } else {
                console.log(error.message);
                throw new InternalServerErrorException()
                
            }
        }   
    }

    async signIn(userDto: UserDto): Promise<{accessToken: string }> {

        let username = await this.validatedPassword(userDto)

        if(!username) {
            throw new UnauthorizedException('invalid credential')
        } 

        let payload: JwtPayload =  { username }
        let accessToken = await this.jwtService.sign(payload)

        return { accessToken }
    }

    async validatedPassword(userDto: UserDto): Promise<string> {
        let { username, password } = userDto
        let user = await this.userRepository.findOne({username})
        
        if( (user)&& (await this.validatePassword(password, user.password))) {
            return user.username
        } else {
            return null
        } 
    }

    private hashPassword(password: string, salt): string {
        return bcrypt.hash(password, salt)
    }

    private async validatePassword(password: string, userPassword: string): Promise<boolean> {
        
        let hash = await bcrypt.compare(password, userPassword)
        return hash
    }
}