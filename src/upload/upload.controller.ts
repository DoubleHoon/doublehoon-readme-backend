import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @ApiOperation({
    summary: `이미지 업로드`,
    description: `Body, form-data, image\n\n{ image: 업로드 파일 }\n\nfileType: png|jpg|jpeg|gif\n\nmaxSize: 5MB`,
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(png|jpg|jpeg|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5000000, // Byte, 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = await this.uploadService.uploadImage(image, res);
      return res.send(result);
    } catch (error) {
      return res.status(500).json(`Failed to upload image: ${error.message}`);
    }
  }
}
