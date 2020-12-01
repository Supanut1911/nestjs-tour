import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-credential-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

    users= []

    async getusers() {
        return this.users
    }

    async getUserById() {

    }

    async createUser(userDto: UserDto): Promise<void> {
        let { username, password } = userDto
        let newUser = {
            username,
            password
        }

        this.users.push(newUser)
    }
}



