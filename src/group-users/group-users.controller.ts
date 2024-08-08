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
  ApiTags,
} from '@nestjs/swagger';
import { InvitationUser } from 'src/group/dto/request/invitation.dto';
import { GetInvitationDto } from './dto/request/getInvitation.dto';
import { createGroupUserInvitationDto } from './dto/response/createGroupUser.dto';
import { TrueAcceptUserDto } from './dto/response/trueAcceptUser.dto';
import { GetGroupUsersResponseDto } from './dto/response/GetGroupUsers.dto';

@ApiTags('GroupUsers')
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
  @ApiResponse({ status: 201, type: createGroupUserInvitationDto })
  @HttpCode(HttpStatus.CREATED)
  async createUserInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
    @Req() req: JwtRequest,
  ) {
    const { userId } = req.user;

    return await this.groupUsersService.createUserInvitation(
      createInvitationDto,
      userId,
    );
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
  @ApiResponse({ status: 201, type: TrueAcceptUserDto })
  @ApiBody({ type: InvitationUser })
  @Patch('accept')
  @HttpCode(HttpStatus.CREATED)
  async invitationUser(@Body() invitationUser: InvitationUser) {
    return await this.groupUsersService.invitationUser(invitationUser);
  }
  /**
   * userFlow => 오너가 신청 보낸 유저 확인 => 조회
   * serverFlow => 이건 내일
   * 3계층 순서로 요청을 보냄
   * Controller(getInvitationUsers)
   * Service(findByUser, getInvitationUsers)
   * Repository(getInvitationUsers)
   * RequsetDto(GetInvitationDto)
   * ResponseDto(GetGroupUsersResponseDto)
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: GetGroupUsersResponseDto })
  @ApiOperation({ summary: '가입 신청 조회' })
  @ApiCookieAuth('accessToken')
  @ApiBody({ type: InvitationUser })
  @Get('invitationUsers')
  @HttpCode(HttpStatus.OK)
  async getInvitationUsers(@Body() getInvitationDto: GetInvitationDto) {
    return await this.groupUsersService.getInvitationUsers(
      getInvitationDto.groupId,
    );
  }
}
