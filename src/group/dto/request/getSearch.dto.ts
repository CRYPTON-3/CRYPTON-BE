import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSearchDto {
  @IsString()
  @ApiProperty({ example: '신앙 대학교 목탁 학과' })
  @IsNotEmpty({ message: '검색어를 입력해주세요.' })
  search: string;
}
