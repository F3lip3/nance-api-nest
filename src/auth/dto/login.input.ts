import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class LoginInputDto extends PickType(User, ['email', 'password']) {}
