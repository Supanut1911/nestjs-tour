import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../user/get-user-decorator';
import { User } from '../user/user.entity';
import { TodoDto } from './dto/todo.dto';
import { TodoStatusValidationPipe } from './pipe/todo-status-validation.pipe';
import { Todo } from './todo.entity';
import { TodoStatus } from './todo.enum';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('todo')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TodoController {

    constructor(
        private todoService: TodoService
    ){}

    @Post()
    @ApiResponse({
        status: 201
    })
    @ApiCreatedResponse({
        description: 'create todo'
    })
    @ApiBody({
        type: TodoDto
    })
    @UsePipes(ValidationPipe)
    createTodo(
        @Body() todoDto: TodoDto,
        @GetUser() user: User
    ):Promise<Todo> {
        return this.todoService.createTodo(todoDto, user)
    }

    @Get()
    getTodos(
        @GetUser() user: User
    ):Promise<Todo[]> {
        return this.todoService.getTodos(user)
    }

    @Patch('/:id')
    updateTodo(
        @Param('id') id: string,
        @Body('status', TodoStatusValidationPipe) status: TodoStatus,
        @GetUser() user: User  
    ):Promise<Todo> {
        return this.todoService.updateTodo(id, status, user)
    }

    @Delete('/:id')
    deleteTodo(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Object> {
        return this.todoService.deleteTodo(id, user)
    }

    // @Get('/test')
    // getTest(
    //     req: Request,
    //     @Body('avatarname') avatarname: string,
    //     @Body() power: number
    // ) {
    //     console.log(req, avatarname, power);
        
    // }

    @Get('/test')
    getTest(

    ) {
        return 'ya'
    }
}
