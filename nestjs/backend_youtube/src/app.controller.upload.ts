import { Controller, Get, Post, UploadedFile, UseInterceptors, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from  'multer';
import { extname } from  'path';

// upload ex https://www.techiediaries.com/nestjs-upload-serve-static-file/
// cors ex https://github.com/expressjs/cors#configuration-options
// https://docs.nestjs.com/techniques/security

@Controller('upload')
export class AppControllerUpload {
  constructor(private readonly appService: AppService) {}

  @Post()
    @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: './avatars', 
          filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
        })
      }
    )
    )
  uploadFile(@UploadedFile() file) {
    console.log('aquii', file);
  }

  @Get('file/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars'});
  }
}
