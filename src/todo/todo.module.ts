import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TodoController } from './todo.controller';
import { TodoMiddleware } from './todo.middleware';
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
export class TodoModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TodoMiddleware)
      .forRoutes('todo')
  }

}
