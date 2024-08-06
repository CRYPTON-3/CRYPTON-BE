import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetGroupDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '그룹 ID',
  })
  @IsNotEmpty({ message: '그룹을 선택해주세요.' })
  groupId: number;
}
