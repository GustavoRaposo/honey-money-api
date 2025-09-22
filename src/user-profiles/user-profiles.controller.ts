import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';

@Controller('user_profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Post()
  create(@Body(ValidationPipe) createUserProfileDto: CreateUserProfileDto) {
    return this.userProfilesService.create(createUserProfileDto);
  }

  @Get('profiles/:uuid')
  findProfilesByUserUuid(@Param('uuid') uuid: string) {
    return this.userProfilesService.findProfilesByUserUuid(uuid);
  }

  @Get('profiles/:uuid/functionalities')
  findFunctionalitiesByUserUuid(@Param('uuid') uuid: string) {
    return this.userProfilesService.findFunctionalitiesByUserUuid(uuid);
  }

  @Get('users/:id')
  findUsersByProfileId(@Param('id', ParseIntPipe) id: number) {
    return this.userProfilesService.findUsersByProfileId(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userProfilesService.remove(id);
  }
}
