import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async sendMail(user: any): Promise<any> {
    try {
      const host = this.config.get('HOST');

      await this.mailerService.sendMail({
        to: user.email,
        from: 'noreply@nestjs.com',
        subject: 'Verify your email',
        text: 'welcome',
        template: 'confirmation',
        context: {
          user,
          host,
        },
      });
      return {
        status: 'success',
        message: 'Verify email successfully!',
      };
    } catch (error) {
      throw error;
    }
  }

  async sendMailForgotPassword(user: any): Promise<any> {
    try {
      const host = this.config.get('HOST');

      await this.mailerService.sendMail({
        to: user.email,
        from: 'noreply@nestjs.com',
        subject: 'Reset your password',
        text: 'welcome',
        template: 'reset-password',
        context: {
          user,
          host,
        },
      });
      return {
        status: 'success',
        message: 'Verify email successfully!',
      };
    } catch (error) {
      throw error;
    }
  }
}
