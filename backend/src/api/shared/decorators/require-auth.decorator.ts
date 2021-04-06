import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { AuthenticatedGuard } from '../guards/authenticated.guard';

export function PqRequiresAuth() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Requires Authentication',
    }),
    UseGuards(AuthenticatedGuard),
  );
}
