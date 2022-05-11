import { SetMetadata } from '@nestjs/common';
export enum Role {
  Root = 'root',
  Admin = 'admin',
  Staff = 'staff',
  Customer = 'customer',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
