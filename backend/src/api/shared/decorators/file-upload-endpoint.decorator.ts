import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export const PqFileUploadEndpoint = (fileName = 'file'): MethodDecorator => {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fileName)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'file',
            format: 'binary',
          },
        },
      },
    }),
  );
};
