import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/enum';

@Injectable()
export class RoleGuard implements CanActivate {
  roles: UserRole[];

  constructor(roles: UserRole[]) {
    this.roles = roles;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const response = context.switchToHttp().getResponse();
    const role = response.locals.role;

    return this.roles.includes(role);
  }
}
