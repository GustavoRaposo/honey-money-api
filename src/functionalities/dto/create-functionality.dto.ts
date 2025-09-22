import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFunctionalityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}