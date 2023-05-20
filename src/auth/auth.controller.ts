import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('kakao/login')
  @ApiOperation({ summary: `카카오 로그인`, description: `카카오 로그인 주소로 리다이렉트` })
  kakaoLogin(@Res() res: Response) {
    const _hostName = 'https://kauth.kakao.com';
    const _restApiKey = this.configService.get('AUTH_KAKAO_KEY');
    const _serverAddress = this.configService.get('SERVER_ADDRESS');
    const _redirectUrl = `http://${_serverAddress}/auth/kakao/redirect`;
    const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirectUrl}&response_type=code`;
    return res.redirect(url);
  }

  @Get('kakao/redirect')
  @ApiOperation({ summary: `카카오 로그인 전용 리다이렉트`, description: `임의 호출 금지` })
  async kakaoRedirect(@Query() qs, @Res() res: Response) {
    const accessToken = await this.authService.kakaoLogin(qs.code);
    const userData = await this.authService.getKakaoUserInfo(accessToken);
    return res.send(userData);
  }

  @UseGuards(AuthGuard)
  @Get('kakao/unlink')
  @ApiOperation({
    summary: `회원 탈퇴`,
    description: `카카오 계정과 ReadMe 연결 해제, ReadMe 회원 정보 삭제`,
  })
  @ApiBearerAuth('access-token')
  async kakaoUnlink(@Req() req, @Res() res: Response) {
    if (!req.authorized) throw new UnauthorizedException();
    return res.send(
      await this.authService.kakaoUnlink(req.user.kakaoAccessToken, req.user.userUuid),
    );
  }

  @Get('/test/kakao/login')
  @ApiTags('Test')
  @ApiOperation({
    summary: `[DEV ONLY] 테스트 계정 로그인`,
    description: `[DEV ONLY] 테스트 계정 access token 발급, Production 환경 API 호출 금지, Kakao 관련 기능 사용 불가능`,
  })
  async testKakaoLogin(@Req() req, @Res() res: Response) {
    const userData = await this.authService.testKakaoAccessToken(2762715913);
    return res.send(userData);
  }
}
