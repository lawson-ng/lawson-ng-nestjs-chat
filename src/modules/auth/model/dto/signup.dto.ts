import { Length } from 'class-validator';

export class SignUpDto {
  @Length(6)
  userName: string;

  @Length(8)
  password: string;
}
