import { Injectable, Logger } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  public async getAll(): Promise<Role[]> {
    const roles = [
      Role.Admin,
    ];

    return roles;
  }
}