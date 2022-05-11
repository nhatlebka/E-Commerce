import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/base-repository';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  protected entityDocument: UserDocument;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
