export interface TokenData {
  name: string;
  email: string;
  username: string;
}

export interface DecodedToken extends TokenData {
  iat: number;
  exp: number;
}
