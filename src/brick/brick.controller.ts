import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrickService } from './brick.service';

@Controller('brick')
@ApiTags('Brick')
export class BrickController {
  constructor(private readonly brickService: BrickService) {}
}
