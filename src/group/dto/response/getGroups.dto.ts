import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGroupResponseDto } from './createGroup.dto';

export class GetGroupsDto {
  @ApiProperty({ type: [CreateGroupResponseDto] })
  groups: CreateGroupResponseDto[];

  @ApiProperty({ example: 1, minimum: 1, type: Number })
  page: number;
}
