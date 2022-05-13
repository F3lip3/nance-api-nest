import { User } from '../../users/entities/user.entity';

export class LoginResponseDto {
  access_token: string;
  user: User;
}
