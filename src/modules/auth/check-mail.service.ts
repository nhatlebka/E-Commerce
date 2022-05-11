import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRepository } from './users.repository';

@Injectable()
export class CheckMailService {
  constructor(private readonly userRepository: UserRepository) {}
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    const users = await this.userRepository.findAll({ isVerify: false });

    for (let user of users) {
      const userTime = new Date(user.createdAt).getTime();
      const time = new Date().getTime();
      const expireTime = time - userTime;
      if (expireTime > 60000) {
        await this.userRepository.delete({ username: user.username });
      }
    }
  }
}
