import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileMiddleware } from './profile.middleware';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileRepository]),
    UserModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProfileMiddleware)
      .forRoutes('profile')
  }

}
