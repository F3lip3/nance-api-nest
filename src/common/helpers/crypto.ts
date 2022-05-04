import { compare, hash } from 'bcrypt';

export const crypto = {
  encrypt(value?: string): Promise<string | undefined> {
    if (!value) return undefined;

    return hash(value, 10);
  },
  compare(value: string, encrypted: string): Promise<boolean> {
    return compare(value, encrypted);
  },
};
