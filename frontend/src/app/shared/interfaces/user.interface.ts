import { Profile } from './profile.interface';

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  screenName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  profile: Profile;
}
