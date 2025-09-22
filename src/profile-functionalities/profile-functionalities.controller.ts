import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfileFunctionalitiesService } from './profile-functionalities.service';
import { CreateProfileFunctionalityDto } from './dto/create-profile-functionality.dto';

@Controller('profile-functionalities')
export class ProfileFunctionalitiesController {
  constructor(
    private readonly profileFunctionalitiesService: ProfileFunctionalitiesService,
  ) {}

  @Post()
  create(@Body() createProfileFunctionalityDtos: CreateProfileFunctionalityDto[]) {
    return this.profileFunctionalitiesService.create(createProfileFunctionalityDtos);
  }

  @Get()
  findAll() {
    return this.profileFunctionalitiesService.findAll();
  }

  @Get(':profile')
  findByProfile(@Param('profile', ParseIntPipe) profileId: number) {
    return this.profileFunctionalitiesService.findByProfile(profileId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profileFunctionalitiesService.remove(id);
  }
}