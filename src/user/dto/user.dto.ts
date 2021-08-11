import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UserDTO {
  id
  
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  // @Exclude()
  password?: string;
}