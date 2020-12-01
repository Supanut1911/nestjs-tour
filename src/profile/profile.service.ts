import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ProfileDto } from './dto/profile-dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
}
