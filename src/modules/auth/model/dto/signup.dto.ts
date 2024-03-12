import { IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @Length(6)
  @IsNotEmpty()
  userName: string;

  @Length(8)
  @IsNotEmpty()
  password: string;
}
