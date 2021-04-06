import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { User } from '../entities/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto';

@ApiTags('Auth/Web')
@Controller('/api/v1/auth/web')
export class WebAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  async register(@Body() dto: RegisterUserDto): Promise<User> {
    const user = await this.authService.register(dto);

    this.sessionService.storeUser(user);

    return user;
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Authenticate a user with email and password' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 403, description: 'Invalid Credentials' })
  async login(@Body() dto: LoginUserDto): Promise<User> {
    const user = await this.authService.findByEmailAndPassword(dto.email, dto.password);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
    }

    this.sessionService.storeUser(user);

    return user;
  }

  @Post('logout')
  @HttpCode(204)
  @ApiOperation({ summary: 'Log out the current user' })
  @ApiResponse({ status: 204, description: 'Empty Response' })
  logout(): void {
    this.sessionService.destroy();
  }
}
