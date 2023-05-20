import { ApiProperty } from '@nestjs/swagger';

export class ModifyProfileInfoByIdDto {
  @ApiProperty({
    example: [`BackEnd`, `DevOps`],
    description: `분야 목록`,
    required: true,
  })
  area: string[];

  @ApiProperty({
    example: `백엔드 개발자 이중훈입니다.`,
    description: `한 줄 소개`,
    required: true,
  })
  title: string;

  @ApiProperty({
    example: `example@example.com`,
    description: `이메일`,
    required: true,
  })
  email: string;

  @ApiProperty({
    example: [
      { channel: 'linkedin', contact: '@example' },
      { channel: 'github', contact: '@example' },
    ],
    description: `이메일`,
    required: true,
  })
  channel: channelProps[];
}

interface channelProps {
  channel: string;
  contact: string;
}
