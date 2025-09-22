export class AuthResponseDto {
  access_token: string;
  refresh_token: string;
  expires_in: number; // em segundos
  user: {
    uuid: string;
    name: string;
    email: string;
  };
}
