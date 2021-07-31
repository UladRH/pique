import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { MediaAttachmentDraft } from '../../../core/interfaces';

@Injectable({ providedIn: 'root' })
export class MediaAttachmentsService {
  constructor(private readonly api: ApiService) {}

  upload(file: File): Observable<MediaAttachmentDraft> {
    const formData = new FormData();
    formData.append('file', file);

    return this.api.post('/media', formData);
  }
}
