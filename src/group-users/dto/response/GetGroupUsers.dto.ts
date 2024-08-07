import { PartialType } from '@nestjs/swagger';
import { createGroupUserInvitationDto } from './createGroupUser.dto';

export class GetGroupUsersResponseDto extends PartialType(
  createGroupUserInvitationDto,
) {}
