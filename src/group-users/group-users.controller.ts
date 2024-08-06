import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupUsersService } from './group-users.service';
import { CreateInvitationDto } from './dto/request/createInvitation.dto';
import { JwtRequest } from 'src/utils/data/jwt.data';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { InvitationUser } from 'src/group/dto/request/invitation.dto';
import { GetInvitationDto } from './dto/request/getInvitation.dto';

@Controller('groupUsers')
export class GroupUsersController {
  constructor(private readonly groupUsersService: GroupUsersService) {}

  /**
   * userFlow => 그룹을 찾고 신청을 보냄 => 그룹 가입 신청 성공
   * serverFlow => GroupUser에 이미 있는 유저인지 확인 , 없다면 요청을 생성
   * 3계층 순서로 요청을 보냄
   * Controller(createUserInvitation)
   * Service(createUserInvitation, findByUser)
   * Repository(createUserInvitation)
   * RequsetDto(CreateInvitationDto)
   * ResponseDto()
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '그룹 가입 요청' })
  @ApiCookieAuth('accessToken')
  @ApiBody({ type: CreateInvitationDto })
  @Post('create')
  @ApiResponse({ status: 201 })
  @HttpCode(HttpStatus.CREATED)
  async createUserInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
    @Req() req: JwtRequest,
  ) {
    const { userId } = req.user;

    const invitationGroup = await this.groupUsersService.createUserInvitation(
      createInvitationDto,
      userId,
    );

    return {
      message: '가입 요청에 성공하였습니다.',
      data: invitationGroup,
    };
  }

  /**
   * userFlow => 오너가 그룹 승인을 함 => 그룹 승인 성공
   * serverFlow => GroupUserInvitation에서 조회 => 이후 GroupUserInvitation DB에서 삭제 및 GroupUser생성
   * 3계층 순서로 요청을 보냄
   * Controller(invitationUser)
   * Service(findByUser, trueInvitationUser)
   * Repository(createUserInvitation)
   * RequsetDto(InvitationUser)
   * ResponseDto()
   *
   * if 그룹 승인일 거절함
   * serverFlow => GroupUserInvitation에서 isAccept을 false로
   * 3계층 순서로 요청을 보냄
   * Controller(invitationUser)
   * Service(findByUser, falseInvitationUser)
   * Repository(createUserInvitation)
   * RequsetDto(InvitationUser)
   * ResponseDto()
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '그룹원 승인' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 201 })
  @ApiBody({ type: InvitationUser })
  @Patch('accept')
  @HttpCode(HttpStatus.CREATED)
  async invitationUser(@Body() invitationUser: InvitationUser) {
    const isAcceptUser =
      await this.groupUsersService.invitationUser(invitationUser);

    return {
      message: '유저 가입 승인이 완료 되었습니다.',
      data: isAcceptUser,
    };
  }
  /**
   * userFlow => 오너가 신청 보낸 유저 확인 => 조회
   * serverFlow => 이건 내일
   * 3계층 순서로 요청을 보냄
   * Controller(getInvitationUsers)
   * Service(findByUser, getInvitationUsers)
   * Repository(getInvitationUsers)
   * RequsetDto(GetInvitationDto)
   * ResponseDto()
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: '가입 신청 조회' })
  @ApiCookieAuth('accessToken')
  @ApiBody({ type: InvitationUser })
  @Get('invitationUsers')
  @HttpCode(HttpStatus.OK)
  async getInvitationUsers(@Body() getInvitationDto: GetInvitationDto) {
    const getInvitation = await this.groupUsersService.getInvitationUsers(
      getInvitationDto.groupId,
    );

    return {
      data: getInvitation,
    };
  }
}
