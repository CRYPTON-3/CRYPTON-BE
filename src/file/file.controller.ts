import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    const utfFiles = files.map((file) => {
      const filename = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );
      return { ...file, originalname: filename };
    });
    console.log(utfFiles);
    return;
  }
}
