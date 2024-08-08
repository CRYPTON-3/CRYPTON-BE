import { ApiProperty } from '@nestjs/swagger';

export class TrueAcceptUserDto {
  @ApiProperty({ example: 1 })
  groupId: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: '한살차이-제인' })
  name: string;

  @ApiProperty({ example: '2024-08-07T12:00:00.000Z' })
  createdAt: Date;
}
