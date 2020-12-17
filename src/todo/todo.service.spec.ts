import { InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { create } from "domain"
import { TodoStatus } from "./todo.enum"
import { TodoRepository } from "./todo.repository"
import { TodoService } from "./todo.service"

let mocktodoRepository = () => ({
    create: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
})

let mockUser = {
    id: '1',
    username: 'test user'
}

describe('todoService', () => {


    let todoService
    let todoRepository

    beforeEach( async () => {
        let module = await Test.createTestingModule({
            providers: [
                TodoService,
                { provide: TodoRepository, useFactory: mocktodoRepository }
            ]
        }).compile()
        
        todoService = await module.get<TodoService>(TodoService)
        todoRepository = await module.get<TodoRepository>(TodoRepository)
    })


    describe('createTodo', () => {

        let save
        let mockTodo = { todotopic: 'todo1', description: 'test des'}

        beforeEach( () => {
            save = jest.fn()
            todoRepository.create.mockReturnValue({ save })
        })
        

        it('create success', async () => {
       

    
            save.mockResolvedValue(undefined)
            expect(save).not.toHaveBeenCalled()
            let result = await todoService.createTodo(mockTodo, mockUser)
            expect(save).toHaveBeenCalled()
            // expect(result).toEqual(mockTodo)
            // console.log(result);
            
            expect(todoService.createTodo(mockTodo, mockUser)).resolves.not.toThrow()
        })
    
        // it('createTodo Error',  async () => {
        //     save.mockResolvedValue({error: Error})
        //     let result = await todoService.createTodo(mockTodo, mockUser)
            
        //     expect(todoService.createTodo(mockTodo, mockUser)).resolves.toThrow()
        // })
    })  

    describe('getTodo', () => {

        it('getTodos', async () => {
            todoRepository.find.mockResolvedValue('somevalue')
            expect(todoRepository.find).not.toHaveBeenCalled()
            let result = await todoService.getTodos(mockUser)
            // console.log(result);
            
            expect(todoRepository.find).toHaveBeenCalled()

            expect(result).toEqual('somevalue')
        })
    })

    describe('deleteTodo',() => {

        
        it('detete success', async () => {
            todoRepository.delete.mockResolvedValue({ affected: 1})
            
            expect(todoRepository.delete).not.toHaveBeenCalled()
            
            let result = await todoService.deleteTodo('1', mockUser)
            
            expect(todoRepository.delete).toHaveBeenCalledWith({ id: '1', createBy: mockUser.id})
            
            expect(result).toEqual({message: 'success'})
        })
        
        // it('not found user', async () => {
        //     todoRepository.delete.mockResolvedValue({ affected: 0})
        //     expect(await todoService.deleteTodo('1', mockUser)).resolves.toThrowError(InternalServerErrorException)
        //     // .rejects.toThrowError(NotFoundException)
        // })  
        
        // it('internalError', async () => {
        //     todoRepository.delete.mockRejectedValue()
        //     expect(await todoService.deleteTodo()).rejects.toThrowError(InternalServerErrorException)
        // })
        
    })

    // describe('updateTodo', () => {
    //     let mockTodo = {}
    //     todoRepository.save.mockResolvedValue(true)
    //     todoRepository.findOne.mockResolvedValue(mockTodo)


    // })
})