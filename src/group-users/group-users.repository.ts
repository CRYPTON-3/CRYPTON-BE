import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvitationDto } from './dto/request/createInvitation.dto';

@Injectable()
export class GroupUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: number, groupId: number) {
    try {
      const user = await this.prisma.groupUserInvitation.findFirst({
        where: {
          userId,
          groupId,
        },
      });
      if (!user) {
        throw new NotFoundException('존재하지 않는 가입 신청 입니다.');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  async getInvitationUsers(groupId: number) {
    return await this.prisma.groupUserInvitation.findMany({
      where: {
        groupId,
      },
    });
  }

  async trueInvitationUser(userId: number, name: string, groupId: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.groupUserInvitation.delete({
        where: {
          groupId_userId: {
            userId,
            groupId,
          },
        },
      });

      await tx.groupUser.create({
        data: {
          userId,
          name,
          groupId,
        },
      });
    });
  }

  async falseInvitationUser(userId: number, groupId: number) {
    return await this.prisma.groupUserInvitation.update({
      where: {
        groupId_userId: {
          userId,
          groupId,
        },
      },
      data: {
        isAccept: false,
      },
    });
  }

  async createUserInvitation(
    createInvitationDto: CreateInvitationDto,
    userId: number,
  ) {
    return await this.prisma.groupUserInvitation.create({
      data: {
        ...createInvitationDto,
        userId,
      },
    });
  }
}
