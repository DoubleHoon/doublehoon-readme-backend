import { UserRoDto } from '@/user/dto/user.dto';
import { UserService } from '@/user/user.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { EmptyResponse, LoginResponse } from './auth.interface';
import { ProfileService } from '@/profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private jwtService: JwtService,
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  async generateAccessToken(userRo: UserRoDto): Promise<string> {
    const payload = {
      userUuid: userRo.userUuid,
      userName: userRo.userName,
      kakaoAccessToken: userRo.kakaoAccessToken,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async kakaoLogin(code: string): Promise<string> {
    const _restApiKey = this.configService.get('AUTH_KAKAO_KEY');
    const _serverAddress = this.configService.get('SERVER_ADDRESS');
    const _redirect_uri = `http://${_serverAddress}/auth/kakao/redirect`;
    const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_uri=${_redirect_uri}&code=${code}`;
    const _headers = {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded;charset=utf-8`,
      },
    };

    const loginResult = await lastValueFrom(this.httpService.post(_hostName, '', _headers));
    const accessToken = loginResult.data[`access_token`];
    return accessToken;
  }

  async getKakaoUserInfo(kakaoAccessToken: string): Promise<LoginResponse> {
    const _url = `https://kapi.kakao.com/v2/user/me`;
    const _headers = {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    };

    const userData = await lastValueFrom(this.httpService.get(_url, _headers));
    const _kakaoId = userData.data[`id`];
    const _userName = userData.data[`kakao_account`][`profile`][`nickname`];
    const checkMember = await this.userService.findByKakaoId(_kakaoId);

    if (checkMember) {
      const accessToken = await this.generateAccessToken({
        userUuid: checkMember.userUuid,
        userName: checkMember.userName,
        kakaoAccessToken: kakaoAccessToken,
      });

      return {
        message: 'success',
        accessToken: accessToken,
        data: {
          newUser: false,
        },
      };
    }

    const newUser = await this.userService.create(_userName, _kakaoId);
    const accessToken = await this.generateAccessToken({
      userUuid: newUser.userUuid,
      userName: _userName,
      kakaoAccessToken: kakaoAccessToken,
    });
    await this.profileService.create(newUser.userId, newUser.userUuid);

    return {
      message: 'success',
      accessToken: accessToken,
      data: {
        newUser: true,
        info: 'Must set userId',
      },
    };
  }

  async kakaoLogout(kakaoAccessToken: string): Promise<EmptyResponse> {
    const _url = 'https://kapi.kakao.com/v1/user/logout';
    const _headers = {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    };

    await lastValueFrom(this.httpService.post(_url, '', _headers));
    return {
      message: 'success',
      data: {},
    };
  }

  async kakaoUnlink(kakaoAccessToken: string, userUuid: string): Promise<EmptyResponse> {
    const _url = 'https://kapi.kakao.com/v1/user/unlink';
    const _headers = {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    };

    try {
      await lastValueFrom(this.httpService.post(_url, '', _headers));
      await this.userService.deleteByUuid(userUuid);
      await this.profileService.deleteByUuid(userUuid);
    } catch (e) {
      console.log(e);
    }

    return {
      message: 'success',
      data: {},
    };
  }

  async testKakaoAccessToken(kakaoId: number): Promise<any> {
    const checkMember = await this.userService.findByKakaoId(kakaoId);
    const accessToken = await this.generateAccessToken({
      userUuid: checkMember.userUuid,
      userName: checkMember.userName,
      kakaoAccessToken: `kakaoAccessToken`,
    });
    return {
      accessToken: accessToken,
      data: {
        newUser: false,
      },
    };
  }
}
