import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { ProfileDto } from "./dto/profile-dto";
import { Profile } from "./profile.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
}