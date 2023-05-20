import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from '@/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SetUserIdRequestDto } from './dto/user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('create')
  @ApiOperation({
    summary: `[DEV ONLY] 사용자 생성`,
    description: `[DEV ONLY] 사용자 생성`,
  })
  create() {
    return this.userService.create(`test`, 1234);
  }

  @Get('all')
  @ApiOperation({
    summary: `[DEV ONLY] 전체 사용자 목록 조회`,
    description: `[DEV ONLY] 전체 사용자 목록 조회`,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('findbyuserid/:userid')
  @ApiOperation({
    summary: `[DEV ONLY] userId로 사용자 조회`,
    description: `[DEV ONLY] userId로 사용자 조회`,
  })
  findById(@Param('userid') userId: string) {
    return this.userService.findByUserId(userId);
  }

  @Get('findbykakaoid/:kakaoId')
  @ApiOperation({
    summary: `[DEV ONLY] kakaoId로 사용자 검색`,
    description: `[DEV ONLY] kakaoId로 사용자 검색`,
  })
  findByKakaoId(@Param('kakaoId') kakaoId: number) {
    return this.userService.findByKakaoId(kakaoId);
  }

  @UseGuards(AuthGuard)
  @Post('/manage/setuserid')
  @ApiOperation({
    summary: `userId 설정`,
    description: `회원 가입 이후 사용자 Id 설정\n\nTODO: Id Rules`,
  })
  @ApiBearerAuth('access-token')
  async setUserId(@Req() req, @Res() res: Response, @Body() body: SetUserIdRequestDto) {
    if (!req.authorized) throw new UnauthorizedException();
    return res.send(await this.userService.setUserId(req.user, body.userId));
  }

  @UseGuards(AuthGuard)
  @Get('info')
  @ApiOperation({
    summary: `[DEV ONLY] 사용자 정보 조회`,
    description: `[DEV ONLY] 사용자 정보 조회`,
  })
  @ApiBearerAuth('access-token')
  getProfile(@Req() req) {
    if (!req.authorized) throw new UnauthorizedException();
    return this.userService.getUserInfo(req.user);
  }
}
