import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { UploadFileDto } from './dto/request';
import { FileListDto } from './dto/response';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'Upload files' })
  @ApiResponse({ status: 201, description: 'success' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    // return 값 없음, Guard 적용해야 함, 파일 확장자 유효성 검사 필요
    await this.fileService.upload(files, 1);
    return;
  }

  @ApiOperation({ summary: '로그인 한 유저의 개인폴더의 전체 파일 가져오기' })
  @ApiResponse({ status: 200, description: 'success', type: FileListDto })
  @Get()
  async getFiles() {
    // Guard 적용해야 함
    return this.fileService.getFiles(1);
  }
}
