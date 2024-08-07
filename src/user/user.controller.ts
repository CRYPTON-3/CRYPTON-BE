import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtRequest } from 'src/utils/data/jwt.data';
import { UpDateNameDto } from 'src/auth/dto/request/update-auth.dto';
import { userInfoDto } from 'src/auth/dto/response/userInfo';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 유저 이름 업데이트
   * userFlow => 유저 이름 업데이트 요청 => 업데이트 성공
   * serverFlow => 업데이트 업데이트 업데이트
   * 3계층 순서로 업데이트 요청을 보냄
   * Controller(updateName)
   * Service(updateName)
   * Repository(updateName)
   * RequsetDto(UpDateNameDto)
   * ResponseDto(userInfoDto)
   */
  @ApiOperation({
    summary: '이름 업데이트',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 201, type: userInfoDto })
  @Patch('update')
  @ApiBody({ type: UpDateNameDto })
  @HttpCode(HttpStatus.CREATED)
  async updateName(
    @Body() upDateNameDto: UpDateNameDto,
    @Req() req: JwtRequest,
  ) {
    const { userId } = req.user;

    return await this.userService.updateName(upDateNameDto, userId);
  }

  /**
   * 유저 회원 탈퇴
   * userFlow => 유저 회원 탈퇴 요청 => 탈퇴 성공
   * serverFlow => 탈퇴 탈퇴 탈퇴
   * 3계층 순서로 요청을 보냄
   * Controller(deleteUser)
   * Service(deleteUser)
   * Repository(deleteUser)
   */
  @ApiOperation({
    summary: '유저 회원 탈퇴',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 200 })
  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Req() req: JwtRequest) {
    const { userId } = req.user;

    return await this.userService.deleteUser(userId);
  }
}
