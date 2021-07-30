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

export interface PostCreateDto {
  content: string;
  mediaAttachmentsIds: MediaAttachmentDraft['id'][];
}

export interface MediaAttachment {
  fileUri: string;
}

export interface MediaAttachmentDraft {
  id: string;
  fileUri: string;
}
