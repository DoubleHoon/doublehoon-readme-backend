import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
import { ModifyProfileInfoByIdDto } from './profile.dto';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Get(':userid')
  @ApiOperation({
    summary: `사용자 프로필 열람`,
    description: `사용자 프로필 열람`,
  })
  async getProfileById(@Req() req, @Res() res, @Param('userid') userId: string) {
    if (!req.authorized) {
      return res.send(await this.profileService.getProfileByIdWithoutMask(userId));
    }
    return res.send(await this.profileService.getProfileByIdWithMask(userId));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/info/modify/:userid')
  @ApiOperation({
    summary: `사용자 프로필 내 정보 수정`,
    description: `사용자 프로필 내 정보 수정\nRequest userId와 로그인 토큰 정보 불일치시 401 Error`,
  })
  async modifyProfileInfoById(
    @Req() req,
    @Res() res,
    @Body() data: ModifyProfileInfoByIdDto,
    @Param('userid') userId: string,
  ) {
    if (!req.authorized) throw new UnauthorizedException();
    return res.send(
      await this.profileService.modifyProfileInfoById(userId, req.user.userUuid, data),
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/brick/new/:userid')
  @ApiOperation({
    summary: `사용자 프로필 내 브릭 추가`,
    description: `사용자 프로필 내 브릭 추가\nRequest userId와 로그인 토큰 정보 불일치시 401 Error`,
  })
  async createProfileBrickById(@Req() req, @Res() res, @Param('userid') userId: string) {
    if (!req.authorized) {
      if (!req.authorized) throw new UnauthorizedException();
    }
    return res.send(await this.profileService.createProfileBrickById(userId, req.user.userUuid));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/brick/modify/:userid')
  @ApiOperation({
    summary: `사용자 프로필 내 브릭 수정`,
    description: `사용자 프로필 내 브릭 수정`,
  })
  async modifyProfileBrickById(@Req() req, @Res() res, @Param('userid') userId: string) {
    // if (!req.authorized) {
    //   if (!req.authorized) throw new UnauthorizedException();
    // }
    // return res.send(await this.profileService.getProfileByIdWithMask(userId));
  }
}
