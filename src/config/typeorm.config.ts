import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      name: 'nest',
      type: 'mysql',
      host: configService.get('TYPEORM_HOST'),
      port: configService.get('TYPEORM_PORT'),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
};
