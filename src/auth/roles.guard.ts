// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) {
      return true; // If no role is required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // User is set in the request by a previous guard

    if (!user || user.usertype !== requiredRole) {
      console.log('User:', user, 'Required role:', requiredRole);
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    return true;
  }
}
