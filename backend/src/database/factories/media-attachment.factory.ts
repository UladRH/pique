import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { MediaAttachment } from '../../api/media/entities/media-attachment.entity';

define(MediaAttachment, (faker: typeof Faker) => {
  const media = new MediaAttachment();

  media.fileUri = 'https://picsum.photos/seed/' + faker.random.alphaNumeric(5) + '/800/600';

  return media;
});
