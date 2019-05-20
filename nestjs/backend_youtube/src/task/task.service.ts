import { Injectable } from '@nestjs/common';
import { Task } from './task';
@Injectable()
export class TaskService {
  tasks: Task[] = [
    {
      id: 1,
      title: 'teste',
      description: 'testandooo...',
      done: false,
    },
    {
      id: 2,
      title: 'teste2',
      description: 'testandooo2...',
      done: true,
    },
    {
      id: 3,
      title: 'teste3',
      description: 'testandooo3...',
      done: true,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: number): Task {
    return this.tasks.find(i => i.id === id);
  }
}
