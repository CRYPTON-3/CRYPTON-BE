import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpDateNameDto } from 'src/auth/dto/request/update-auth.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  /**
   * 유저 이름 업데이트
   */
  async updateName(updateNameDto: UpDateNameDto, id: number) {
    try {
      const { name } = updateNameDto;
      return await this.userRepository.updateName(name, id);
    } catch (error) {
      throw new InternalServerErrorException(
        '이름 업데이트 중 오류가 발생했습니다.',
      );
    }
  }

  /**
   * 유저 삭제
   */
  async deleteUser(id: number) {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      throw new InternalServerErrorException(
        '유저 삭제 중 오류가 발생했습니다.',
      );
    }
  }
}
