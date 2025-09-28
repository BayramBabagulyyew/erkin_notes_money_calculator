export interface TokenDto {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  isSuperUser?: boolean;
}
