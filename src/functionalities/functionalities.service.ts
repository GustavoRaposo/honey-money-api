import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';

@Injectable()
export class FunctionalitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createFunctionalityDto: CreateFunctionalityDto) {
    return this.prisma.functionality.create({
      data: createFunctionalityDto,
    });
  }

  async findAll() {
    return this.prisma.functionality.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const functionality = await this.prisma.functionality.findUnique({
      where: { id },
    });

    if (!functionality) {
      throw new NotFoundException(`Functionality with ID ${id} not found`);
    }

    return functionality;
  }

  async update(id: number, updateFunctionalityDto: UpdateFunctionalityDto) {
    await this.findOne(id); // Verifica se existe
    
    return this.prisma.functionality.update({
      where: { id },
      data: updateFunctionalityDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    
    return this.prisma.functionality.delete({
      where: { id },
    });
  }
}