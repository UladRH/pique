import { Profile } from './profile.interface';

export interface Post {
  id: string;
  content: string;
  profileId: Profile['id'];
  profile: Profile;
  mediaAttachments: MediaAttachment[];
  liked?: boolean;
  likesCount: number;
  createdAt: string;
}

export interface MediaAttachment {
  fileUri: string;
}
