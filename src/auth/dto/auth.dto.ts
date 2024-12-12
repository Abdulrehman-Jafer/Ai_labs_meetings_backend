import { IsEmail, IsNotEmpty, IsString, Min } from '@nestjs/class-validator';

export class UserRegister {
  @IsNotEmpty()
  @IsString()
  @Min(4)
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Min(6)
  password: string;
}

export class UserLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Min(6)
  password: string;
}
