import { UserEntity } from '../../users/entities/user.entity';

export class LoginResponseDto {
  access_token: string;
  user: UserEntity;
}
