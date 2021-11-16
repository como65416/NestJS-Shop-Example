import { UserRole } from '../../enum';

export class UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
