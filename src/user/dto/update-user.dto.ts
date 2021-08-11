import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  id;
  
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  role?: string;

  @IsString()
  @IsOptional()
  password?: string;
}