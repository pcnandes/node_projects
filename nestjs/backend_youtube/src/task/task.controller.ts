import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './creat-task.dto';
import { TaskService } from './task.service';
import { Task } from 'dist/task/task';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id') id: string): Task {
    return this.taskService.getTask(parseInt(id));
  }

  @Post()
  incluirTask(@Body() task: CreateTaskDto): string {
    console.log(task);
    return 'incluindo task';
  }

  @Put(':id')
  updateTask(@Body() task: CreateTaskDto, @Param('id') id): string {
    console.log(id);
    console.log(task);
    return `atualizando ${id}`;
  }

  @Delete(':id')
  deletaTask(@Param('id') id): string {
    return `deletando ${id}`;
  }
}
