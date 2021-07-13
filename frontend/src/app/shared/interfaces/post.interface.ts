import { Profile } from './profile.interface';

export interface Post {
  id: string;
  content: string;
  mediaAttachments: any[];
  createdAt: string;
  profileId: string;
  profile?: Profile;
  likesCount: number;
  liked: boolean;
}
