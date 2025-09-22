import { IsOptional, IsString, IsEmail } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
