import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoEntity } from './entity/todo.entity';
import { todos } from 'src/mock/todos.mock';
import { TodoDto } from './dto/todo.dto';
import { toPromise } from '../shared/utils';
import { toTodoDto } from '../shared/mapper';
import { TodoCreateDto } from './dto/todo.create.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  todos: TodoEntity[] = todos;

  async getAllTodo(): Promise<TodoDto[]> {
    return todos.map((todo) => toTodoDto(todo));
  }

  // @ts-ignore
  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toTodoDto(todo));
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todo: TodoEntity = {
      id: uuidv4(),
      name,
      description,
    };

    this.todos.push(todo);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return toPromise(toTodoDto(todo));
  }

  // async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
  //   const todo = this.todos.find((todo) => todo.id === id);
  //
  //   if (!todo) {
  //     throw new HttpException(
  //       `Todo list doesn't exist`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
