import { PartialType } from '@nestjs/swagger';
import { CreateGroupResponseDto } from './createGroup.dto';

export class UpadteGroupResponseDto extends PartialType(
  CreateGroupResponseDto,
) {}
