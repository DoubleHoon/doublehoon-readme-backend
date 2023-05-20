import { ApiProperty } from '@nestjs/swagger';

export class UserRoDto {
  userUuid: string;
  userName: string;
  kakaoAccessToken: string;
}

export class SetUserIdRequestDto {
  @ApiProperty({
    example: 'Readme',
    description: '변경할 ID',
    required: true,
  })
  userId: string;
}
