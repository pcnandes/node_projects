import { Injectable } from '@nestjs/common';

// Sevices são responsáveis pelo armazenamento e recuperação de dados
// um provider é qqr classe com @Injectable um provider permitee injetar dependencias
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getTodos(): string {
    return 'Todos!';
  }
}
