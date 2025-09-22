import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FunctionalitiesService } from './functionalities.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';

@Controller('functionalities')
export class FunctionalitiesController {
  constructor(private readonly functionalitiesService: FunctionalitiesService) {}

  @Post()
  create(@Body() createFunctionalityDto: CreateFunctionalityDto) {
    return this.functionalitiesService.create(createFunctionalityDto);
  }

  @Get()
  findAll() {
    return this.functionalitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.functionalitiesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFunctionalityDto: UpdateFunctionalityDto,
  ) {
    return this.functionalitiesService.update(id, updateFunctionalityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.functionalitiesService.remove(id);
  }
}