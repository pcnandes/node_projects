import { CondominioModule } from './condominio/condominio.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CondominioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
