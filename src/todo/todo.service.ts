import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './todo.entity';
import { TodoStatus } from './todo.enum';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository: TodoRepository
    ) {}

    async createTodo(
        todoDto: TodoDto,
        user: User
    ):Promise<Todo> {
        let {todotopic, description} = todoDto

        let newTodo = new Todo()
        newTodo.todotopic = todotopic
        newTodo.description = description
        newTodo.status = TodoStatus.INIT
        newTodo.user = user

        try {
            await newTodo.save()
            delete newTodo.user
            return newTodo
        } catch (error) {
            console.log(error.message);
            throw new Error(error)
            // throw new BadRequestException()
        }
    }

    async getTodos(
        user: User
    ):Promise<Todo[]> {
        let todos = this.todoRepository.find({ user })
        return todos
    }

}
