import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './utils/loggerMiddleware';
import { AuthModule } from './auth/auth.module';
import { UploadController } from './upload/upload.controller';
import { ProfileModule } from './profile/profile.module';
import { UploadModule } from './upload/upload.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == `prod` ? `.env.prod` : `.env.dev`,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    ProfileModule,
    UploadModule,
    ExportModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
