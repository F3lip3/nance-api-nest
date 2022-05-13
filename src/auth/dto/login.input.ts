import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../../users/entities/user.entity';

export class LoginInputDto extends PickType(UserEntity, [
  'email',
  'password'
]) {}
