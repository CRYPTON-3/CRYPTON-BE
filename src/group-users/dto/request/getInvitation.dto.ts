import { PickType } from '@nestjs/swagger';
import { CreateInvitationDto } from './createInvitation.dto';

export class GetInvitationDto extends PickType(CreateInvitationDto, [
  'groupId',
]) {}
