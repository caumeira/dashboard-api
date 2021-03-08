import { HashComparer } from '@/application/criptography/hash-comparer';
import { Hasher } from '@/application/criptography/hasher';

export class ABCAdapter implements Hasher, HashComparer {
  compare = async (plaitext: string, digest: string): Promise<boolean> => {
    return `${plaitext}abc` === digest;
  };

  hash = async (plaintext: string): Promise<string> => {
    return `${plaintext}abc`;
  };
}
