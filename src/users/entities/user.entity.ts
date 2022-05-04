import { Status, User as UserEntity, UserRole } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements UserEntity {
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

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
