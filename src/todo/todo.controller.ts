import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoListDto } from './dto/todo.list.dto';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoDto } from './dto/todo.dto';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<TodoListDto> {
    const todos = await this.todoService.getAllTodo();
    return { todos };
  }

  @Post()
  async createTodo(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
    return await this.todoService.createTodo(todoCreateDto);
  }
}
