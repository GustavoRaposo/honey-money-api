import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  userUuid: string;

  @IsNotEmpty()
  @IsInt()
  profileId: number;
}
