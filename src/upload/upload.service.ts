import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private readonly s3;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: configService.get('AWS_S3_BUCKET_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_S3_BUCKET_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_S3_BUCKET_REGION'),
    });
    this.s3 = new AWS.S3();
  }

  async uploadImage(image: Express.Multer.File, @Res() res) {
    const key = `${Date.now() + image.originalname}`;
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      ACL: 'private',
      Key: key,
      Body: image.buffer,
    };

    try {
      const exec = await this.s3.putObject(params).promise();
      const bucketUrl = `${this.configService.get('AWS_CLOUDFRONT_URL')}/${key}`;
      console.log(`${bucketUrl} -> ${JSON.stringify(exec)}`);
      const result = {
        data: bucketUrl,
      };

      return result;
    } catch (err) {
      console.log(err);
      return res.status(500).json(`Failed to upload image file: ${err}`);
    }
  }
}
