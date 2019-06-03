import { AppControllerUpload } from './app.controller.upload';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [AppController, AppControllerUpload ],
  providers: [AppService],
})
export class AppModule {}
