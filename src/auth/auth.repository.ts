import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * 유저 생성
   */
  async createUser(email: string, nickName: string, provider: string) {
    return this.prisma.user.create({
      data: {
        email,
        nickName,
        provider,
      },
    });
  }

  /**
   * 유저 이메일로 유저 조회
   */
  async findByEmail(email: string) {
    try {
      const isExistingEmail = await this.prisma.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          nickName: true,
        },
      });

      if (!isExistingEmail) {
        throw new NotFoundException('존재하지 않는 이메일 입니다.');
      }

      return isExistingEmail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  /**
   * 유저 ID로 조회
   */
  async findById(id: number) {
    try {
      const isExistingId = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          email: true,
          nickName: true,
        },
      });

      if (!isExistingId) {
        throw new NotFoundException('존재하지 않는 아이디 입니다.');
      }

      return isExistingId;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  /**
   * 유저 이름 업데이트
   */
  async updateName(name: string, id: number) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        nickName: name,
      },
    });
  }

  /**
   * 유저 삭제
   */
  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * 리프레시 토큰 업데이트
   */
  async updateToken(refreshToken: string, id: number) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  }
}
