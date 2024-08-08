import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetCodeDto {
  @IsNumber()
  @ApiProperty({ example: 'uuid' })
  @IsNotEmpty({ message: '초대 코드를 입력해주세요.' })
  code: string;
}
