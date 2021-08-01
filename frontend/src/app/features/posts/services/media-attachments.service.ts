import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@pique/frontend/core/services';
import { MediaAttachmentDraft } from '@pique/frontend/core/interfaces';

@Injectable({ providedIn: 'root' })
export class MediaAttachmentsService {
  constructor(private readonly api: ApiService) {}

  upload(file: File): Observable<MediaAttachmentDraft> {
    const formData = new FormData();
    formData.append('file', file);

    return this.api.post('/media', formData);
  }
}
