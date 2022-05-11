import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CategoryQueryDto {
  @ApiProperty({ type: String, required: false, example: 'laptop' })
  @IsString()
  @IsOptional()
  @Length(4, 50)
  name: string;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNumberString()
  @IsOptional()
  position: number;

  @ApiProperty({ type: Boolean, required: false, example: true })
  @IsBooleanString()
  @IsOptional()
  states: boolean;
}

export class CategoryCreateUpdateDto {
  @ApiProperty({ type: String, example: 'laptop' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  name: string;

  @ApiProperty({ type: String, example: ['something'] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  banner: string[];

  @ApiProperty({ type: String, example: 'description' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  position: number;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  @IsNotEmpty()
  states: boolean;
}

export class CategoryDetailsResDto {
  @ApiProperty({ example: '6262c1a486bc221f1d5f4db4' })
  _id: string;
  @ApiProperty({ type: String, required: false, example: 'laptop' })
  name: string;
  @ApiProperty({ type: String, example: ['something'] })
  banner: string[];
  @ApiProperty({ type: String, example: 'description' })
  description: string;
  @ApiProperty({ type: Number, example: 1 })
  position: number;
  @ApiProperty({ type: Boolean, example: true })
  states: boolean;
  @ApiProperty({ example: ['Products'] })
  products: String;
  @ApiProperty({ example: '2022-04-22T14:54:28.912+00:00' })
  createdAt: String;
  @ApiProperty({ example: '2022-04-22T14:54:28.912+00:00' })
  updatedAt: String;
}
