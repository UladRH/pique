import { Injectable } from '@nestjs/common';
import Argon2 from 'argon2';

@Injectable()
export class HashingProvider {
  hash(password: string): Promise<string> {
    return Argon2.hash(password);
  }

  verify(hashed: string, plain: string): Promise<boolean> {
    return Argon2.verify(hashed, plain);
  }
}
