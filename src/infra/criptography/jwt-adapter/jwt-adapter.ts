import jwt from 'jsonwebtoken';

import { Decrypter } from '@/application/criptography/decrypter';
import { Encrypter } from '@/application/criptography/encrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    const ciphertext = jwt.sign({ id: plaintext }, this.secret);

    return ciphertext;
  }

  async decrypt(ciphertext: string): Promise<string> {
    const plaintext = jwt.verify(ciphertext, this.secret);

    return plaintext as string;
  }
}