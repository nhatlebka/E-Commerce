import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ImageQueryDto {
  @ApiProperty({ type: String, required: false, example: 'avatar' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: false, example: 'banner' })
  @IsOptional()
  @IsString()
  type: string;

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
    enum: ['name', 'type'],
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({ type: String, required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortBy?: string;
}
