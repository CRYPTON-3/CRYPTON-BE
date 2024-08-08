import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * 유저 이름 업데이트 DTO
 */
export class UpDateNameDto {
  @IsString()
  @ApiProperty({
    example: '임종훈',
    description: '이름',
  })
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;
}
