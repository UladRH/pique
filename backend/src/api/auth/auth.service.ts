import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HashingProvider } from '../shared/crypto/hashing.provider';
import { ProfilesService } from '../profiles/profiles.service';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './web-auth/dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly profilesService: ProfilesService,
    private readonly hashing: HashingProvider,
  ) {}

  findById(id: string): Promise<User | undefined> {
    return this.userRepo.findOne(id);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ email });
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    const user = await this.findByEmail(email);

    if (await this.checkPassword(user, password)) {
      return user;
    }

    return undefined;
  }

  async register(dto: RegisterUserDto): Promise<User | undefined> {
    if (await this.profilesService.existsByScreenName(dto.screenName)) {
      throw new UnprocessableEntityException(['screenName already occupied']);
    }

    if (await this.findByEmail(dto.email)) {
      throw new UnprocessableEntityException(['email already occupied']);
    }

    const user = new User();
    user.email = dto.email;
    await this.setPassword(user, dto.password);
    user.profile = new Profile();
    user.profile.screenName = dto.screenName;

    return this.userRepo.save(user);
  }

  private async checkPassword(user: User | undefined, plainPassword: string): Promise<boolean> {
    if (!user) {
      // This is intended to make it more difficult for any potential
      // attacker to find valid emails by using timing attacks.
      await this.hashing.hash('');
      return false;
    }

    return this.hashing.verify(user.hashed_password, plainPassword);
  }

  private async setPassword(user: User, plainPassword: string): Promise<User> {
    user.hashed_password = await this.hashing.hash(plainPassword);
    return user;
  }
}
