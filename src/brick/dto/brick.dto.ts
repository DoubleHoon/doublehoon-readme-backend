import { ApiProperty } from '@nestjs/swagger';

export class BrickLongDto {
  brickUuid: string;
  createdAt: Date;
  updatedAt: Date;
  brickIcon: string;
  brickBanner: string;
  brickTitle: string;
  brickSummary: string;
  brickDetail: string;
}

export class BrickShortDto {
  brickUuid: string;
  brickIcon: string;
  brickBanner: string;
  brickTitle: string;
  brickSummary: string;
}

export class CreateBrickDto {
  brickUuid: string;
  brickTitle: string;
  brickIcon: string;
  brickBanner: string;
  brickSummary: string;
}
