import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { stat } from 'fs';
import { User } from '../user/user.entity';
import { PaginatedProductsResultDto } from './dto/PaginatedProductsResult.dto';
import { PaginationDto } from './dto/Pagination.dto';
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

        let newTodo = this.todoRepository.create()
        newTodo.todotopic = todotopic
        newTodo.description = description
        newTodo.status = TodoStatus.INIT
        newTodo.user = user

        try {
            await newTodo.save()
            // delete newTodo.user
            return newTodo
        } catch (error) {
            console.log(error.message);
            throw new Error()
        }
    }

    async getTodos(
        user: User
    ):Promise<Todo[]> {
        let todos = this.todoRepository.find({ user })
        return todos
    }

    async updateTodo(
        id: string,
        status: TodoStatus,
        user: User
    ):Promise<Todo> {
        try {
            let todo = await this.todoRepository.findOne({ id, createBy: user.id })
            if(!todo) {
                throw new NotFoundException()
            } 
            todo.status = status
            await todo.save()
            return todo
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException()
        }
    }

    async deleteTodo (
        id: string,
        user: User
    ):Promise<Object> {
        try {
            let result = await this.todoRepository.delete({ id, createBy: user.id})
            if (result.affected === 0) {
                throw new NotFoundException()
            }
            return {
                message: 'success'
            }
        } catch (error) {
            throw new InternalServerErrorException()
        } 
    }

    async findAllTodo(
        paginationDto: PaginationDto
    ): Promise<PaginatedProductsResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.todoRepository.count()
        const todos = await this.todoRepository.createQueryBuilder()
        // .orderBy('createdAt', "DESC")
        .offset(skippedItems)
        .limit(paginationDto.limit)
        .getMany()

        return {
            data: todos,
            page: paginationDto.page,
            limit: paginationDto.limit,
            totalCount,
        }

    }
}
