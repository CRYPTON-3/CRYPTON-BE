import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GroupUserRepository } from './group-users.repository';
import { InvitationUser } from 'src/group/dto/request/invitation.dto';
import { CreateInvitationDto } from './dto/request/createInvitation.dto';

@Injectable()
export class GroupUsersService {
  constructor(private readonly groupUserRepository: GroupUserRepository) {}

  async invitationUser(invitationUser: InvitationUser) {
    try {
      const acceptUser = await this.findByUser(
        invitationUser.userId,
        invitationUser.groupId,
      );
      if (!acceptUser) {
        throw new Error('');
      }

      if (invitationUser.isAccept === true) {
        return await this.groupUserRepository.trueInvitationUser(
          acceptUser.userId,
          acceptUser.name,
          acceptUser.groupId,
        );
      } else if (invitationUser.isAccept === false) {
        return await this.groupUserRepository.falseInvitationUser(
          acceptUser.userId,
          acceptUser.groupId,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(
        '가입 승인 중 오류가 발생했습니다.',
      );
    }
  }

  async getInvitationUsers(groupId: number) {
    try {
      return await this.groupUserRepository.getInvitationUsers(groupId);
    } catch (error) {
      throw new InternalServerErrorException(
        '가입 신청 유저들 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async findByUser(userId: number, groupId: number) {
    try {
      return await this.groupUserRepository.findByUser(userId, groupId);
    } catch (error) {
      throw new InternalServerErrorException(
        '가입 신청 유저 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async createUserInvitation(
    createInvitationDto: CreateInvitationDto,
    userId: number,
  ) {
    try {
      const user = await this.findByUser(userId, createInvitationDto.groupId);
      if (user) {
        throw new ConflictException('이미 신청한 유저입니다.');
      }
      return await this.groupUserRepository.createUserInvitation(
        createInvitationDto,
        userId,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        '그룹 가입 신청 중 오류가 발생했습니다.',
      );
    }
  }
}
