import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InvitationUser {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '신청한 유저 id',
  })
  @IsNotEmpty({ message: '유저 ID를 입력해주세요.' })
  userId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '그룹 ID를 입력해주세요',
  })
  @IsNotEmpty({ message: '그룹 ID를 입력해주세요.' })
  groupId: number;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: '승인 여부',
  })
  @IsNotEmpty({ message: '승인 여부를 선택해주세요' })
  isAccept: boolean;
}
