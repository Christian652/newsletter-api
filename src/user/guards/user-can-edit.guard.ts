import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserCanEditGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { rawHeaders, body } = context.switchToHttp().getRequest();
    const rawToken = rawHeaders.find(item => item.includes('Bearer'));

    if (!rawToken) return false;

    const jwtWithoutBearer = rawToken.replace('Bearer ', '');
    const decodedJwt = this.jwtService.decode(jwtWithoutBearer);
    const userLogged = await this.userService.findById({ id: decodedJwt['id'] });

    if (!decodedJwt['id']) return false;
    if (userLogged.role == "Administrador") return true;
    if (userLogged.role == "User") return userLogged.id == parseInt(body.id);
      
    return false; 
  }
}
