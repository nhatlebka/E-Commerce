import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { GetCurrentUser } from 'src/decorators/user.decorator';
import { User } from '../auth/user.schema';
import { ICountRes } from '../products/products.interface';
import {
  VoucherCountDto,
  VoucherCreateUpdateDto,
  VoucherQueryDto,
} from './vouchers.dto';
import { IVoucherRes } from './vouchers.interface';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Get()
  @ApiBearerAuth()
  async getVouchers(
    @GetCurrentUser() user: User,
    @Query() query: VoucherQueryDto,
  ): Promise<IVoucherRes[]> {
    try {
      const rs = await this.vouchersService.getVouchers(user, query);
      if (rs.length === 0)
        throw new HttpException('Cannot find any vouchers', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get('/get-count')
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Root)
  async getCount(@Query() query: VoucherCountDto): Promise<ICountRes> {
    try {
      const rs = await this.vouchersService.getCount(query);
      if (!rs) throw new HttpException('Cannot find voucher', 400);
      return { count: rs };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get('/for-many')
  @ApiBearerAuth()
  async getVoucherForMany(): Promise<IVoucherRes[]> {
    try {
      const rs = await this.vouchersService.getVoucherForMany();
      if (!rs.length) throw new HttpException('Cannot find voucher', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get('/free-ship')
  @ApiBearerAuth()
  async getVoucherFreeShip(): Promise<IVoucherRes[]> {
    try {
      const rs = await this.vouchersService.getVoucherFreeShip();
      if (!rs.length) throw new HttpException('Cannot find voucher', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  async getVoucherById(
    @GetCurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<IVoucherRes> {
    try {
      const rs = await this.vouchersService.getVoucherById(user, id);
      if (!rs) throw new HttpException('Cannot find voucher', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  @Roles(Role.Admin, Role.Root, Role.Staff)
  @ApiBearerAuth()
  async createVoucher(
    @Body() data: VoucherCreateUpdateDto,
  ): Promise<IVoucherRes> {
    try {
      const rs = await this.vouchersService.createVoucher(data);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Root, Role.Staff)
  @ApiBearerAuth()
  async updateVoucher(
    @Param('id') id: string,
    @Body() data: VoucherCreateUpdateDto,
  ): Promise<IVoucherRes> {
    try {
      const rs = await this.vouchersService.updateVoucher(id, data);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Root, Role.Staff)
  @ApiBearerAuth()
  async deleteVoucher(@Param('id') id: string): Promise<any> {
    try {
      const rs = await this.vouchersService.deleteVoucher(id);
      if (!rs) throw new HttpException('Cannot find voucher', 400);
      return rs;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
