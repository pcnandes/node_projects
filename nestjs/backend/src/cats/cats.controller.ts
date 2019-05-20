import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

@Post()
// @UsePipes(ValidationPipe) um validation pode ser invcluido pontualmente em uma chamada
async create(@Body() createCatDto: CreateCatDto) {
  console.log('criando cat')
  this.catsService.create(createCatDto);
}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}