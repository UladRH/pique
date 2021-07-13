import { Profile } from './profile.interface';

export interface Post {
  id: string;
  content: string;
  mediaAttachments: MediaAttachment[];
  createdAt: string;
  profileId: string;
  profile?: Profile;
  likesCount: number;
  liked: boolean;
}

export interface MediaAttachment {
  fileUri: string;
}
