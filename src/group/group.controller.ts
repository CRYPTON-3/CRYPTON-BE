import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { CreateGroupDto } from './dto/request/createGroup.dto';
import { JwtRequest } from 'src/utils/data/jwt.data';
import { UpdateGroupDto } from './dto/request/updateGroup.dto';
import { GetGroupDto } from './dto/request/getGroup';
import { GetCodeDto } from './dto/request/getCode.dto';
import { GetSearchDto } from './dto/request/getSearch.dto';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  /**
   * userFlow => 그룹 생성 요청 => 그룹 생성 성공
   * serverFlow => 생성 생성 생성
   * 3계층 순서로 생성 요청을 보냄
   * Controller(createGroup)
   * Service(createGroup)
   * Repository(createGroup)
   * RequsetDto(CreateGroupDto)
   * ResponseDto(CreateGroupDto)
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '그룹 생성' })
  @ApiCookieAuth('accessToken')
  @ApiBody({ type: CreateGroupDto })
  @ApiResponse({ status: 201, type: CreateGroupDto })
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Req() req: JwtRequest,
  ) {
    const { userId } = req.user;

    const createGroup = await this.groupService.createGroup(
      createGroupDto,
      userId,
    );

    return {
      message: '그룹 생성에 성공하였습니다.',
      data: createGroup,
    };
  }

  /**
   * userFlow => 그룹 이름, 코멘트 업데이트 요청 => 그룹 업데이트 성공
   * serverFlow => 오너인지 확인 후 오너가 맞다면 => 업데이트
   * 3계층 순서로 요청을 보냄
   * Controller(updateGroup)
   * Service(updateGroup,getGroup,checkOwner)
   * Repository(updateGroup)
   * RequsetDto(UpdateGroupDto)
   * ResponseDto(UpdateGroupDto)
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '그룹 업데이트' })
  @ApiCookieAuth('accessToken')
  @ApiBody({ type: UpdateGroupDto })
  @ApiResponse({ status: 201, type: UpdateGroupDto })
  @Patch('update/:groupId')
  @HttpCode(HttpStatus.CREATED)
  async updateGroup(
    @Body() updateGroupDto: UpdateGroupDto,
    @Req() req: JwtRequest,
  ) {
    const { userId } = req.user;
    const updateGroup = await this.groupService.updateGroup(
      updateGroupDto,
      userId,
    );

    return {
      message: '그룹 업데이트에 성공하였습니다.',
      data: updateGroup,
    };
  }

  /**
   * userFlow => 그룹 코드 업데이트 요청 => 그룹 코드 업데이트 성공
   * serverFlow => 오너인지 확인 후 오너가 맞다면 => 업데이트
   * 3계층 순서로 요청을 보냄
   * Controller(updateCode)
   * Service(updateCode,getGroup,checkOwner)
   * Repository(updateCode)
   * RequsetDto(GetGroupDto)
   * ResponseDto()
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '그룹 코드 변경' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 201 })
  @ApiParam({ name: 'groupId', type: Number, description: '그룹 ID' })
  @Patch('update/:groupId')
  @HttpCode(HttpStatus.CREATED)
  async updateCode(@Body() GetGroupDto: GetGroupDto, @Req() req: JwtRequest) {
    const { userId } = req.user;

    const updateGroup = await this.groupService.updateCode(
      GetGroupDto.groupId,
      userId,
    );

    return {
      message: '그룹 업데이트에 성공하였습니다.',
      data: updateGroup,
    };
  }

  /**
   * userFlow => 그룹 이름으로 검색 => 검색 성공 // 대충 구현해놓았는데 안쓸듯?
   * 3계층 순서로 요청을 보냄
   * Controller(getGroup)
   * Service(searchGroups)
   * Repository(searchGroups)
   * RequsetDto(GetGroupDto)
   * ResponseDto()
   */
  @ApiOperation({ summary: '그룹 이름 검색' })
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 200, type: GetSearchDto })
  @ApiBody({ type: GetSearchDto })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getGroup(@Body() getSearchDto: GetSearchDto) {
    const getGroup = await this.groupService.searchGroups(getSearchDto);

    return {
      data: getGroup,
    };
  }

  /**
   * userFlow => 그룹 코드로 검색 =>  성공
   * 3계층 순서로 요청을 보냄
   * Controller(getCodeGroup)
   * Service(getCodeGroup)
   * Repository(getCodeGroup)
   * RequsetDto(GetCodeDto)
   * ResponseDto(GetCodeDto)
   */
  @ApiOperation({ summary: '그룹 코드 검색' })
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 200, type: GetCodeDto })
  @ApiBody({ type: GetCodeDto })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getCodeGroup(@Body() getCodeDto: GetCodeDto) {
    const getGroup = await this.groupService.getCodeGroup(getCodeDto);

    return {
      data: getGroup,
    };
  }

  /**
   * userFlow => 그룹 삭제 =>  성공
   * serverFlow => 오너인지 확인 후 오너가 맞다면 => 삭제
   * 3계층 순서로 요청을 보냄
   * Controller(deleteGroup)
   * Service(deleteGroup,getGroup,checkOwner)
   * Repository(deleteGroup)
   * RequsetDto(GetGroupDto)
   * ResponseDto()
   */
  @ApiOperation({ summary: '그룹 삭제' })
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'groupId', type: Number, description: '그룹 ID' })
  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async deleteGroup(@Body() getGroupDto: GetGroupDto, @Req() req: JwtRequest) {
    const { userId } = req.user;
    const deleteGroup = await this.groupService.deleteGroup(
      getGroupDto.groupId,
      userId,
    );

    return {
      message: '그룹이 정상적으로 해체되었습니다.',
      data: deleteGroup,
    };
  }
}
