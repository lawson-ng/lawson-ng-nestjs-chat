import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @Length(6)
  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @Length(8)
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @Length(8)
  @IsNotEmpty()
  @ApiProperty()
  confirmPassword: string;
}
