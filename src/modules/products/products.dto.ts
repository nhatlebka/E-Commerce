import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ValidateCategoryName } from './validate-relation/validate-category';

export class ProductQueryDto {
  @ApiProperty({ type: String, required: false, example: 'ASUS Rog' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: Number, required: false, example: 1000 })
  @IsOptional()
  @IsNumberString()
  quantity?: number;

  @ApiProperty({ type: String, required: false, example: 'laptop' })
  @IsOptional()
  @IsString()
  category: string;

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
    enum: ['name', 'buyPrice', 'Price', 'category'],
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({ type: String, required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortBy?: string;
}

export class ProductCountDto {
  @ApiProperty({ type: String, required: false, example: 'ASUS Rog' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, required: false, example: 120000 })
  @IsOptional()
  @IsNumberString()
  buyPrice: number;

  @ApiProperty({ type: Number, required: false, example: 1000 })
  @IsOptional()
  @IsNumberString()
  quantity: number;

  @ApiProperty({ type: String, required: false, example: 'laptop' })
  @IsOptional()
  @IsString()
  category: string;
}

export class ProductUpdateDto {
  @ApiProperty({ type: String, required: false, example: 'ASUS Rog' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ type: String, required: false, example: 'avatar' })
  @IsNotEmpty()
  @IsString()
  avatar: string;
  @ApiProperty({ type: String, required: false, example: ['image'] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  image: string[];
  @ApiProperty({ type: Number, required: false, example: 120000 })
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;
  @ApiProperty({ type: Number, required: false, example: 150000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  weight: number;
  @ApiProperty({ type: Number, required: false, example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @ApiProperty({ type: String, required: false, example: 'laptop' })
  @IsOptional()
  @IsString()
  @Validate(ValidateCategoryName)
  category: string;
  @ApiProperty({ type: String, required: false, example: 'description' })
  @IsOptional()
  @IsString()
  description: string;
}

export class ProductCreateDto extends ProductUpdateDto {
  @ApiProperty({ type: String, required: false, example: 'barcode' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(12, 12)
  barcode: string;
}

export class ProductResDto {
  @ApiProperty({ type: String, required: false, example: 'ASUS Rog' })
  name: string;
  @ApiProperty({ type: String, required: false, example: 'barcode' })
  barcode: string;
  @ApiProperty({ type: String, required: false, example: 'avatar' })
  avatar: string;
  @ApiProperty({ type: String, required: false, example: ['image'] })
  image: string[];
  @ApiProperty({ type: Number, required: false, example: 120000 })
  buyPrice: number;
  @ApiProperty({ type: Number, required: false, example: 150000 })
  MSRP: number;
  @ApiProperty({ type: Number, required: false, example: 1 })
  weight: number;
  @ApiProperty({ type: Number, required: false, example: 1000 })
  quantity: number;
  @ApiProperty({ type: Number, required: false, example: 10 })
  saleQuantity: number;
  @ApiProperty({ type: Number, required: false, example: 0 })
  discountRate: number;
  @ApiProperty({ type: String, required: false, example: 'laptop' })
  category: string;
  @ApiProperty({ example: '2022-04-22T14:54:28.912+00:00' })
  createdAt: String;

  @ApiProperty({ example: '2022-04-22T14:54:28.912+00:00' })
  updatedAt: String;
}
