import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({ type: 'file', isArray: true })
  files: Express.Multer.File[];
}
