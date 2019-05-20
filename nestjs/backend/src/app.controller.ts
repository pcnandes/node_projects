import { Controller, Get, HttpCode, Header, Param, Post, Body, Res, HttpStatus, HttpException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCatDto } from './create-cat.dto'
import { ForbiddenException } from './forbidden.exception'
import { HttpExceptionFilter } from './http-exception.filter'

// recebe as requisições rest
// pode concentrar o caminho das rotas ex @Controller('cats')
@Controller('teste')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // pode definir uma rota específica ex @Get('profile')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('todos')
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  getTodos(): string {
    return this.appService.getTodos();
  }

  @Get('assincono')
  async findAll(): Promise<any> {
    return 'assincrono';
  }

  @Get('erro')
  async findErro() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, 403);
  }

  @Get('erro2')
  // @UseFilters(new HttpExceptionFilter())
  @UseFilters(HttpExceptionFilter) // os filtros podem ter escopo de metodo, controller e global
  async findErro2() {
    throw new ForbiddenException();
  }

  @Get(':id')
  getPorId(@Param() params): string {
    return `Parametro informado: ${params.id}`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    let retorno = new CreateCatDto();
    retorno.name = 'teste';
    return retorno;
  }

  /* formas nao tradicionais de retorno, mas aqui temos mais controle sobre o retorno
  @Post()
  create2(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll2(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
  */
}
