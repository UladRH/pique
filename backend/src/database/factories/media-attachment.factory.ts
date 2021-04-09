import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { MediaAttachment } from '../../api/media/entities/media-attachment.entity';

define(MediaAttachment, (faker: typeof Faker) => {
  const media = new MediaAttachment();

  media.fileUri = faker.image.nature();

  return media;
});
