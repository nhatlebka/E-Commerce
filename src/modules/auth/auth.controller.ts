import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { GetCurrentUser } from 'src/decorators/user.decorator';
import { AuthService } from './auth.service';
import {
  ChangPassDto,
  ForgotDto,
  LoginDto,
  ResetDto,
  UserCreateCustomerDto,
  UserCreateDto,
} from './users.dto';
import { ILoginRes, IRes, IUser, IUserCreateRes } from './users.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register/customer')
  async createCustomerUser(
    @Body() data: UserCreateCustomerDto,
  ): Promise<IUserCreateRes> {
    try {
      const rs = await this.authService.createCustomerUser(data);

      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  @Post('/register')
  async createUser(@Body() data: UserCreateDto): Promise<IUserCreateRes> {
    try {
      const rs = await this.authService.createUser(data);

      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Public()
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    try {
      return this.authService.verifyEmail(token);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Public()
  @Post('/login')
  async login(@Body() data: LoginDto): Promise<ILoginRes> {
    try {
      const rs = await this.authService.loginUser(data);

      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Public()
  @Post('refresh-token')
  async refresh(@GetCurrentUser() user: IUser): Promise<ILoginRes> {
    try {
      return await this.authService.refresh(user.username, user.rtToken);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @ApiBearerAuth()
  @Post('logout')
  async logout(@GetCurrentUser('username') username: string): Promise<IRes> {
    try {
      return await this.authService.logout(username);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Roles(Role.Admin, Role.Root)
  @ApiBearerAuth()
  @Put('lock-user/:id')
  async lockUser(
    @GetCurrentUser() user: IUser,
    @Param('id') id: string,
  ): Promise<IRes> {
    try {
      const rs = await this.authService.lockUser(user, id);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @ApiBearerAuth()
  @Put('change-password')
  async changePassword(
    @GetCurrentUser('username') username: string,
    @Body() data: ChangPassDto,
  ): Promise<IRes> {
    try {
      const rs = await this.authService.changePassword(username, data);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Public()
  @Put('forgot-password')
  async forgotPassword(@Body() data: ForgotDto): Promise<IRes> {
    try {
      const rs = await this.authService.forgotPassword(data.email);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Public()
  @Put('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() data: ResetDto,
  ): Promise<IRes> {
    try {
      const rs = await this.authService.resetPassword(token, data.newPass);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
