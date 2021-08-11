import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;
        
        const { rawHeaders } = context.switchToHttp().getRequest();

        const rawToken = rawHeaders.find(item => item.includes('Bearer'));

        if (rawToken) {
            const jwtWithoutBearer = rawToken.replace('Bearer ', '');
            const decodedJwt = this.jwtService.decode(jwtWithoutBearer);
            
            if (decodedJwt) {
                const user = await this.userService.findById({ id: decodedJwt['id'] });

                if (user.role === "User")
                    if (user.id !== decodedJwt['id'])
                        return false;
    
                return requiredRoles.includes(user.role);
            } else {
                return false;
            }
        } 
    }
}
