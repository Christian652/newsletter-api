// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');


import {
  Controller,
  Post,
  Body,

} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  public async jwtGenerate(
    @Body() userDto: UserDTO
  ) {
    return await this.authService.login(userDto);
  }
}
