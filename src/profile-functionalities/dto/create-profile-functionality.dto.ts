import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProfileFunctionalityDto {
  @IsNotEmpty()
  @IsNumber()
  profile: number;

  @IsNotEmpty()
  @IsNumber()
  funcionality: number;
}