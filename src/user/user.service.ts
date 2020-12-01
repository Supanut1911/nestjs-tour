import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user-credential-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async getusers() {
        return this.userRepository.find()
    }

    async getUserById(id: string): Promise<User> {
        let user = await this.userRepository.findOne(id)
        if(!user) {
            throw new NotFoundException()
        }
        return user
    }

    async createUser(userDto: UserDto): Promise<void> {
        let { username, password } = userDto
        let newUser = new User()
        newUser.username = username
        newUser.password = password

        try {
            await newUser.save()
        } catch (error) {
            throw new BadRequestException()
        }
    
    }
}



