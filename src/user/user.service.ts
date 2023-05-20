import { BadRequestException, Injectable } from '@nestjs/common';
import { EmptyResponse } from '@/auth/auth.interface';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoDto } from './dto/user.dto';
import { ProfileRepository } from '@/profile/profile.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
  ) {}

  async create(userName: string, kakaoId: number): Promise<any> {
    const result = await this.userRepository.insert({
      userName: userName,
      kakaoId: kakaoId,
    });

    return result.generatedMaps[0];
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findByUserId(userId: string) {
    return this.userRepository.findOne({
      where: { userId: userId },
    });
  }

  async deleteByUuid(userUuid: string) {
    return this.userRepository.delete({ userUuid: userUuid });
  }

  async deleteByKakaoId(kakaoId: number) {
    return this.userRepository.delete({ kakaoId: kakaoId });
  }

  async findByKakaoId(kakaoId: number) {
    console.log(kakaoId);
    return this.userRepository.findOne({
      where: {
        kakaoId: kakaoId,
      },
    });
  }

  async setUserId(user: UserRoDto, newUserId: string): Promise<EmptyResponse> {
    const checkDuplicate = await this.userRepository.findOne({
      where: { userId: newUserId },
    });
    if (checkDuplicate) throw new BadRequestException('userId already exists');

    const targetUser = await this.userRepository.findOne({
      where: { userUuid: user.userUuid },
    });
    await this.userRepository.update(targetUser.id, { userId: newUserId });
    const targetProfile = await this.profileRepository.findOne({
      where: { userUuid: user.userUuid },
    });
    await this.profileRepository.update(targetProfile.id, { userId: newUserId });
    return {
      message: 'success',
      data: {},
    };
  }

  async getUserInfo(user: UserRoDto) {
    const targetUser = await this.userRepository.findOne({
      where: { userUuid: user.userUuid },
    });
    return targetUser;
  }
}
