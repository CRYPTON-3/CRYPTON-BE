import { ApiProperty } from '@nestjs/swagger';

/**
 * 유저 정보 반환 DTO
 */
export class userInfoDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: '서울대 - 19 임종훈' })
  name: string;

  @ApiProperty({ example: 'KAKAO' })
  provider: string;
}
