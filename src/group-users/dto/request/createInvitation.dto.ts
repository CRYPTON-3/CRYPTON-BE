import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '그룹 ID',
  })
  @IsNotEmpty({ message: '그룹 ID를 입력해주세요.' })
  groupId: number;

  @IsString()
  @ApiProperty({
    example: '한살차이 - 장세영',
    description: '그룹 유저 이름',
  })
  @IsOptional()
  @IsNotEmpty({ message: '그룹에서 사용할 이름을 입력 해주세요.' })
  name: string;
}
