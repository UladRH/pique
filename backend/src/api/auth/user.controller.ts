import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqRequiresAuth } from '../shared/decorators/require-auth.decorator';
import { PqUser } from '../shared/decorators/user.decorator';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('/api/v1/auth/user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, type: User })
  getCurrentUser(@PqUser() user: User) {
    return user;
  }
}
