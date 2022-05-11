import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { RegexEmail, RegexPassword } from 'src/constants/regex';

enum Role {
  Admin = 'admin',
  Staff = 'staff',
  Customer = 'customer',
}

export class UserCreateCustomerDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  username: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexPassword, {
    message:
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
  })
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexEmail, { message: 'email is invalid' })
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(4, 50)
  @IsNotEmpty()
  address: string;
}

export class UserCreateDto extends UserCreateCustomerDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsEnum(Role)
  @IsNotEmpty()
  role: string;
}

export class LoginDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  username: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexPassword, {
    message:
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
  })
  password: string;
}

export class ChangPassDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexPassword, {
    message:
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
  })
  currentPass: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexPassword, {
    message:
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
  })
  newPass: string;
}

export class ForgotDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexEmail, { message: 'email is invalid' })
  email: string;
}

export class ResetDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexPassword, {
    message:
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
  })
  newPass: string;
}
