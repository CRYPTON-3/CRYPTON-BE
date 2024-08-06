import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpDateNameDto } from './dto/request/update-auth.dto';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { userInfoDto } from './dto/response/userInfo';
import { KakaoAuthGuard } from 'src/utils/guard/kakao.guard';
import { Request, Response } from 'express';
import { JwtRequest } from 'src/utils/data/jwt.data';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiOperation({
  //   summary: '카카오 로그인',
  // })
  // @UseGuards(KakaoAuthGuard)
  // @Get('kakao')
  // @HttpCode(HttpStatus.FOUND)
  // redirectToKakaoAuth(@Res() res): void {
  //   const KAKAO_REST_API_KEY =
  //     this.configService.get<string>('KAKAO_CLIENT_ID');
  //   const KAKAO_REDIRECT_URI =
  //     this.configService.get<string>('KAKAO_REDIRECT_URI');
  //   const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  //   res.redirect(kakaoAuthURL);
  // }

  /**
   * 카카오 로그인 콜백(이후 클라이언트 만들어서 테스트 예정)
   * userFlow => 유저 로그인 시도 => 프론트에서 인가 코드받고 , 카카오에서 콜백 받은 후 서버로 콜백 보냄 => 이후 로그인 성공
   * guard에서 email 추출 후 findByEmail로 이미 가입한 유저인지 판단, 이후 없을시 createProviderUser로 보내서 가입 하게함.
   * 이후 createToken에서 refreshToken, accessToken발급하고 refreshToken은 user DB에 업데이트 , accessToken은 클라이언트에게 전달
   * Controller(kakaoCallbacks)
   * Service(createToken, createProviderUser, findByEmail)
   * Repository(findByEmail, createUser, updateToken)
   * RequsetDto()
   * ResponseDto(userInfoDto)
   */
  @ApiOperation({
    summary: '카카오 로그인 콜백',
  })
  @UseGuards(KakaoAuthGuard)
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 200, type: userInfoDto })
  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  async kakaoCallbacks(@Req() req: Request, @Res() res: Response) {
    const user = req.user as { accessToken?: string } | undefined;

    if (!user || !user.accessToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
    }

    const accessToken = user.accessToken;
    return res.json({ accessToken });
  }

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

    const user = await this.authService.updateName(upDateNameDto, userId);
    return {
      message: '이름 변경에 성공하였습니다.',
      data: user,
    };
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

    const user = await this.authService.deleteUser(userId);
    return {
      message: '회원 탈퇴가 성공적으로 요청됐습니다.',
      data: user,
    };
  }
}
