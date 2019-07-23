import { CondominioModule } from './modules/condominio/condominio.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CondominioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
