import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateGroupDto } from './createGroup.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGroupDto extends PickType(CreateGroupDto, [
  'comment',
  'name',
]) {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '그룹 아이디',
  })
  @IsNotEmpty({ message: '그룹을 선택 해주세요.' })
  groupId: number;
}
