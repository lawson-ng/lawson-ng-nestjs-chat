import {
  Exclude,
  Expose,
  plainToClass,
  plainToInstance,
} from 'class-transformer';

export class UserEntity {
  @Expose()
  id: number;

  @Expose()
  userName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(
      this,
      plainToClass(UserEntity, partial, { excludeExtraneousValues: true }),
    );
  }
}
