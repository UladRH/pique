import { Profile } from './profile.interface';

export interface User {
  id: string;
  profileId: Profile['id'];
  profile?: Profile;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  screenName: string;
  email: string;
  password: string;
}
