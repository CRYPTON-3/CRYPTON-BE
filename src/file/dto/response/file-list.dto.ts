import { ApiProperty } from '@nestjs/swagger';

class FileDto {
  @ApiProperty({ example: 'b2aca21c-7749-45cb-8df7-f1a2de8ff73c' })
  id: string;

  @ApiProperty({ example: '중간과제.pdf.crypton' })
  name: string;

  @ApiProperty({ example: '2024-08-07T09:20:51.838Z', description: 'ISO 8601' })
  createdAt: Date;
}

export class FileListDto {
  @ApiProperty({ type: [FileDto] })
  files: FileDto[];
}
