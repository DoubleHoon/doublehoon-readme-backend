import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from '@/user/user.module';
import { ProfileService } from '@/profile/profile.service';
import { ProfileModule } from '@/profile/profile.module';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    UserModule,
    ProfileModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
