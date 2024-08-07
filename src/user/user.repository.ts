import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

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
}
