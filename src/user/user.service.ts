import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user-credential-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'

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
        let salt = await bcrypt.genSalt()

        let newUser = new User()
        newUser.username = username
        
        newUser.password = await this.hashPassword(password, salt)

        try {
            await newUser.save()
        } catch (error) {
            if(error.code = '23505') {
                throw new ConflictException('user are already exist')
            } else {
                throw new BadRequestException()
            }
        }   
    }

    private hashPassword(password: string, salt): string {
        return bcrypt.hash(password, salt)
    }
}