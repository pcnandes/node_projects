import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// @Global() // deixa o modulo com escopo global, disponivel para td aplicacao. 
// Sendo assim, esse modulo pode ser importado por outros modulos
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}