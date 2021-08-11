import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.Admin)
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) { }

  @Get()
  public async getAll(): Promise<Role[]> {
    try {
      const roles = await this.rolesService.getAll();
      return roles;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}