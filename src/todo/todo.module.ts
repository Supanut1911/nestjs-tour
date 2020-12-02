import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoRepository]),
    UserModule
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
