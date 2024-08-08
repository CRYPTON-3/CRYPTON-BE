import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { createGroupUserInvitationDto } from './createGroupUser.dto';

export class FalseAcceptUserDto extends PartialType(
  createGroupUserInvitationDto,
) {
  @ApiProperty({ example: false, required: false })
  isAccept?: Boolean;
}
