import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user-decorator';
import { User } from '../user/user.entity';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {

    constructor(
        private todoService: TodoService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(
        @Body() todoDto: TodoDto,
        @GetUser() user: User
    ) {
        return this.todoService.createTodo(todoDto, user)
    }

    @Get()
    getTodos(

    ) {

    }
}
