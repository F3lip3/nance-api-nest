import { Status, User, UserRole } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  email: string;
  name: string;
  status: Status;
  role: UserRole;
  created_at: Date;
  updated_at: Date;

  @Exclude()
  password: string;

  @Exclude()
  removed_at: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
