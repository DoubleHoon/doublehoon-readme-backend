import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { BrickService } from '@/brick/brick.service';
import { AnyResponse } from '@/auth/auth.interface';
import { ModifyProfileInfoByIdDto } from './profile.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: ProfileRepository,
    private brickService: BrickService,
    private userService: UserService,
  ) {}

  async findOne(id: string) {
    const targetProfile = await this.profileRepository.findOne({ where: {} });
    return `This action returns a #${id} profile`;
  }

  async create(userId: string, userUuid: string) {
    const result = await this.profileRepository.insert({
      userId: userId,
      userUuid: userUuid,
      brickList: JSON.stringify([]),
    });
    return result.generatedMaps[0].userId;
  }

  async deleteByUuid(userUuid: string) {
    return this.profileRepository.delete({ userUuid: userUuid });
  }

  async getProfileByIdWithoutMask(userId: string): Promise<AnyResponse> {
    const _brickListString = await this.profileRepository.findOne({
      select: { brickList: true },
      where: {
        userId: userId,
      },
    });
    if (!_brickListString) throw new NotFoundException();
    const _brickList = this.brickService.getBrickAllShort(JSON.parse(_brickListString.brickList));
    const _profile = { bricks: _brickList };
    return { message: 'success', data: { profile: _profile } };
  }

  async getProfileByIdWithMask(userId: string): Promise<AnyResponse> {
    const _brickListString = await this.profileRepository.findOne({
      select: { brickList: true },
      where: {
        userId: userId,
      },
    });
    if (!_brickListString) throw new NotFoundException();
    const _brickList = this.brickService.getBrickAllShort(JSON.parse(_brickListString.brickList));
    const _profile = { bricks: _brickList };
    return { message: 'success', data: { profile: _profile } };
  }

  async modifyProfileInfoById(
    _userId: string,
    _userUuid: string,
    newUserInfo: ModifyProfileInfoByIdDto,
  ): Promise<AnyResponse> {
    const _user = await this.userService.findByUserId(_userId);
    if (!_user) throw new NotFoundException();
    if (_user.userUuid !== _userUuid) throw new UnauthorizedException();

    const _profile = await this.profileRepository.findOne({ where: { userUuid: _userUuid } });
    await this.profileRepository.update(_profile.id, { userInfo: JSON.stringify(newUserInfo) });

    return { message: 'success', data: {} };
  }

  async createProfileBrickById(_userId: string, _userUuid: string): Promise<AnyResponse> {
    const _user = await this.userService.findByUserId(_userId);
    if (!_user) throw new NotFoundException();
    if (_user.userUuid !== _userUuid) throw new UnauthorizedException();

    const newBrick = await this.brickService.createBrick();
    return { message: 'success', data: { brick: newBrick } };
  }
}
