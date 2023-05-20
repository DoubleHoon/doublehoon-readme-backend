import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrickEntity } from './brick.entity';
import { BrickRepository } from './brick.repository';
import { BrickLongDto, BrickShortDto, CreateBrickDto } from './dto/brick.dto';

@Injectable()
export class BrickService {
  constructor(
    @InjectRepository(BrickEntity)
    private brickRepository: BrickRepository,
  ) {}

  async getBrickAllShort(brickUuidList: string[]): Promise<BrickShortDto[]> {
    const result: BrickShortDto[] = [];
    for (const brickUuid of brickUuidList) {
      const brickShort = await this.brickRepository.findOne({
        select: {
          brickUuid: true,
          brickIcon: true,
          brickBanner: true,
          brickTitle: true,
          brickSummary: true,
        },
        where: {
          brickUuid: brickUuid,
        },
      });
      result.push(brickShort);
    }
    return result;
  }

  async getBrickOneLong(brickUuid: string): Promise<BrickLongDto> {
    const brickLong = await this.brickRepository.findOne({
      select: {
        brickUuid: true,
        createdAt: true,
        updatedAt: true,
        brickIcon: true,
        brickBanner: true,
        brickTitle: true,
        brickSummary: true,
        brickDetail: true,
      },
      where: {
        brickUuid: brickUuid,
      },
    });
    return brickLong;
  }

  async createBrick(): Promise<CreateBrickDto> {
    const _newBrick = await this.brickRepository.insert({});
    return {
      brickUuid: _newBrick.generatedMaps[0].brickUuid,
      brickTitle: _newBrick.generatedMaps[0].brickTitle,
      brickIcon: _newBrick.generatedMaps[0].brickIcon,
      brickBanner: _newBrick.generatedMaps[0].brickBanner,
      brickSummary: _newBrick.generatedMaps[0].brickSummary,
    };
  }

  async deleteBrick(brickUuid: string) {
    return this.brickRepository.delete({ brickUuid: brickUuid });
  }
}
