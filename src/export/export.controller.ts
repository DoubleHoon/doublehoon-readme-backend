import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExportService } from './export.service';
import { AuthGuard } from '@/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get(':exportid')
  async getExportByIdWithoutMask(@Param('exportid') exportId: string) {
    return this.exportService.getExportByIdWithoutMask(exportId);
  }
}
