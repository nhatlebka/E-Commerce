import { Get, HttpException, Injectable } from '@nestjs/common';
import {
  IChangePass,
  ILogin,
  ILoginRes,
  IRes,
  IUser,
  IUserCreate,
  IUserCreateCustomer,
  IUserCreateRes,
} from './users.interface';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/common/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async updateRtToken(rt: string, username: string): Promise<any> {
    const hashRt = bcrypt.hashSync(rt, +this.config.get('SALT'));
    await this.userRepository.update({ username }, { rtToken: hashRt });
    return { message: 'Refresh token updated successfully!' };
  }

  async createUser(data: IUserCreate): Promise<IUserCreateRes> {
    const salt = +this.config.get('SALT');
    const hash = bcrypt.hashSync(data.password, salt);

    const payload = {
      username: data.username,
      email: data.email,
      role: data.role,
    };
    const atToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('AT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRE_AT'),
    });

    const rtToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('RT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRE_RT'),
    });
    const emailToken = randomBytes(64).toString('hex');

    const hashRt = bcrypt.hashSync(rtToken, salt);

    const newData = {
      ...data,
      password: hash,
      rtToken: hashRt,
      isVerify: false,
      emailToken,
      isActive: true,
    };

    await this.userRepository.create(newData);
    await this.mailService.sendMail(newData);

    return {
      ...newData,
      password: data.password,
      atToken,
      rtToken,
      isActive: true,
    };
  }

  async createCustomerUser(data: IUserCreateCustomer): Promise<IUserCreateRes> {
    const newData = { ...data, role: 'customer' };
    const rs = await this.createUser(newData);

    return rs;
  }

  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({ emailToken: token });
    if (!user) {
      throw new HttpException(
        'Sorry. Token has expired. Please register and verify again.',
        400,
      );
    }
    await this.userRepository.update(
      { username: user.username },
      { isVerify: true },
    );

    return { status: 'success', message: 'Verify email successfully!' };
  }

  async loginUser(data: ILogin): Promise<ILoginRes> {
    const user = await this.userRepository.findOne({ username: data.username });
    if (!user) {
      throw new HttpException('Invalid username', 401);
    }
    if (!user.isVerify) {
      throw new HttpException(
        'You have not verified your email. Please verify your email and login again',
        401,
      );
    }
    const checkPass = bcrypt.compareSync(data.password, user.password);
    if (!checkPass) {
      throw new HttpException('Password is incorrect', 401);
    }

    if (!user.isActive) {
      throw new HttpException('user is not active', 401);
    }

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const atToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('AT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRE_AT'),
    });

    const rtToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('RT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRE_RT'),
    });

    await this.updateRtToken(rtToken, user.username);
    return {
      accessToken: atToken,
      refreshToken: rtToken,
    };
  }

  async refresh(username: string, rt: string): Promise<ILoginRes> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', 401);
    }
    if (!user.rtToken) {
      throw new HttpException('Unauthorize', 401);
    }
    const checkRt = bcrypt.compareSync(rt, user.rtToken);
    if (!checkRt) {
      throw new HttpException('Unauthorize', 401);
    }

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const atToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('AT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRE_AT'),
    });

    const rtToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('RT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRE_RT'),
    });

    await this.updateRtToken(rtToken, user.username);
    return {
      accessToken: atToken,
      refreshToken: rtToken,
    };
  }

  async logout(username: string): Promise<IRes> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('Unauthorize', 401);
    }

    await this.userRepository.update({ username }, { rtToken: null });
    return { status: 'success', message: 'Logout successfully!' };
  }

  async lockUser(user: IUser, id: string): Promise<IRes> {
    const userLock = await this.userRepository.findOne({ _id: id });
    if (!userLock) {
      throw new HttpException('Cannot find user', 400);
    }
    if ((userLock.role = 'root')) {
      throw new HttpException('Forbidden', 403);
    }
    if ((userLock.role = 'admin')) {
      if (user.role === 'admin') {
        throw new HttpException('Forbidden', 403);
      }
    }

    await this.userRepository.update({ _id: id }, { isActive: false });
    return {
      status: 'success',
      message: 'user is locked successfully',
    };
  }

  async changePassword(username: string, data: IChangePass): Promise<IRes> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('Cannot find user', 400);
    }

    const checkPass = bcrypt.compareSync(data.currentPass, user.password);
    if (!checkPass) {
      throw new HttpException('Password is incorrect', 401);
    }
    const salt = +this.config.get('SALT');
    const newPass = bcrypt.hashSync(data.newPass, salt);

    await this.userRepository.update({ username }, { password: newPass });
    return {
      status: 'success',
      message: 'password is updated successfully',
    };
  }

  async forgotPassword(email: string): Promise<IRes> {
    const emailToken = randomBytes(64).toString('hex');
    const user = await this.userRepository.update({ email }, { emailToken });
    await this.mailService.sendMailForgotPassword(user.toObject());
    return {
      status: 'success',
      message: 'sendmail to reset password successfully',
    };
  }

  async resetPassword(emailToken: string, newPass: string): Promise<IRes> {
    const user = await this.userRepository.findOne({ emailToken });
    if (!user) throw new HttpException('User is invalid', 400);
    const token = randomBytes(64).toString('hex');
    const salt = +this.config.get('SALT');
    const hash = bcrypt.hashSync(newPass, salt);
    await this.userRepository.update(
      { username: user.username },
      { emailToken: token, password: hash },
    );

    return { status: 'success', message: 'password reset successfully' };
  }
}
