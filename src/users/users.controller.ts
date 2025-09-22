import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  search(@Query(ValidationPipe) searchUserDto: SearchUserDto) {
    return this.usersService.search(searchUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}