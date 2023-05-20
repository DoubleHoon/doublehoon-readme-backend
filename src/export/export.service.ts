import { Injectable, NotFoundException } from '@nestjs/common';
import { ExportRepository } from './export.repository';
import { ExportEntity } from './export.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BrickService } from '@/brick/brick.service';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(ExportEntity)
    private exportRepository: ExportRepository,
    private brickService: BrickService,
  ) {}

  async getExportByIdWithoutMask(exportId: string) {
    const _brickListString = await this.exportRepository.findOne({
      select: { brickList: true },
      where: {
        exportId: exportId,
      },
    });
    if (!_brickListString) throw new NotFoundException();
    const _brickList = this.brickService.getBrickAllShort(JSON.parse(_brickListString.brickList));
    const _export = { bricks: _brickList };
    return { message: 'success', data: { export: _export } };
  }
}
