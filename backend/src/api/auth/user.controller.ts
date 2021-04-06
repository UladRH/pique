import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqUser } from '../shared/decorators/user.decorator';
import { AuthenticatedGuard } from '../shared/guards/authenticated.guard';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('/api/v1/auth/user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, type: User })
  getCurrentUser(@PqUser() user: User) {
    return user;
  }
}
