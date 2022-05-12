import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

enum VoucherType {
  FREE_SHIP = 'freeShip',
  FOR_ONE = 'forOne',
  FOR_MANY = 'forMany',
}

export class VoucherQueryDto {
  @ApiProperty({ type: String, required: false, example: 'Discount 30%' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: Number, required: false, example: 30 })
  @IsOptional()
  @IsNumberString()
  discountRate?: number;

  @ApiProperty({
    type: String,
    required: false,
    enum: ['forOne', 'forMany', 'freeShip'],
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '2022-04-28T14:54:28.912+00:00',
  })
  @IsOptional()
  @IsString()
  expire: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '62661aa3c92107089962e656',
  })
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @ApiProperty({ type: Number, required: false, example: 5 })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiProperty({ type: Number, required: false, example: 2 })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({
    type: String,
    required: false,
    enum: ['name', 'discountRate', 'totalDiscount', 'minPriceApply', 'expire'],
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({ type: String, required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortBy?: string;
}

export class VoucherCountDto {
  @ApiProperty({ type: String, required: false, example: 'Discount 30%' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: Number, required: false, example: 30 })
  @IsOptional()
  @IsNumberString()
  discountRate?: number;

  @ApiProperty({ type: Number, required: false, example: 100000 })
  @IsOptional()
  @IsNumberString()
  totalDiscount?: number;

  @ApiProperty({ type: Number, required: false, example: 100000 })
  @IsOptional()
  @IsNumberString()
  minPriceApply: number;

  @ApiProperty({
    type: String,
    required: false,
    enum: ['forOne', 'forMany', 'freeShip'],
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '2022-04-28T14:54:28.912+00:00',
  })
  @IsOptional()
  @IsDateString()
  expire: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '62661aa3c92107089962e656',
  })
  @IsMongoId()
  @IsOptional()
  customerId?: string;
}

export class VoucherCreateUpdateDto {
  @ApiProperty({ type: String, required: true, example: 'Discount 30%' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, required: true, example: 30 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  discountRate: number;

  @ApiProperty({ type: Number, required: true, example: 100000 })
  @IsNotEmpty()
  @IsNumber()
  totalDiscount: number;

  @ApiProperty({ type: Number, required: false, example: 100000 })
  @IsOptional()
  @IsNumber()
  minPriceApply: number;

  @ApiProperty({
    type: String,
    required: true,
    enum: ['forOne', 'forMany', 'freeShip'],
  })
  @IsNotEmpty()
  @IsEnum(VoucherType, {
    message: 'Voucher type must be in [forOne, forMany, freeShip]',
  })
  type: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    required: true,
    example: '2022-04-28T14:54:28.912+00:00',
  })
  @IsNotEmpty()
  @IsString()
  expire: string;

  @ApiProperty({
    type: String,
    required: true,
    example: null,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '62661aa3c92107089962e656',
  })
  @IsMongoId()
  @IsOptional()
  customerId?: string;
}
