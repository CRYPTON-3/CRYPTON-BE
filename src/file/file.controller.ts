import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    await this.fileService.upload(files, 1);
    return;
  }
}
