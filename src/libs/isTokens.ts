import { Tokens, User } from '@/types';

export function isTokens(data: Tokens | User): data is Tokens {
  return (
    (data as Tokens).accessToken !== undefined &&
    (data as Tokens).refreshToken !== undefined
  );
}
