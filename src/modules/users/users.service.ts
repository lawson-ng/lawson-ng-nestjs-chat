import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/users.schema';
import { SignUpDto } from 'src/modules/auth/model/dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: SignUpDto) {
    const password = bcrypt.hashSync(createUserDto.password, 12);
    return this.userModel.create({ ...createUserDto, password });
  }

  async findOne(userName: string): Promise<UserDocument | undefined> {
    const data = await this.userModel.findOne({ userName });
    return data;
  }

  async findById(userId: string) {
    return await this.userModel.findById(userId);
  }

  async get() {
    return this.userModel.find();
  }
}
