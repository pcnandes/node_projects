import { Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';

// Sevices são responsáveis pelo armazenamento e recuperação de dados
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}