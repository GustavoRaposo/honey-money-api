import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileFunctionalityDto } from './dto/create-profile-functionality.dto';

@Injectable()
export class ProfileFunctionalitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileFunctionalityDtos: CreateProfileFunctionalityDto[]) {
    const results = [];
    
    for (const dto of createProfileFunctionalityDtos) {
      // Verifica se o profile existe
      const profile = await this.prisma.profile.findUnique({
        where: { id: dto.profile },
      });
      
      if (!profile) {
        throw new NotFoundException(`Profile with ID ${dto.profile} not found`);
      }

      // Verifica se a functionality existe
      const functionality = await this.prisma.functionality.findUnique({
        where: { id: dto.funcionality },
      });
      
      if (!functionality) {
        throw new NotFoundException(`Functionality with ID ${dto.funcionality} not found`);
      }

      // Verifica se a relação já existe
      const existingRelation = await this.prisma.profileFunctionality.findFirst({
        where: {
          profileId: dto.profile,
          functionalityId: dto.funcionality,
        },
      });

      if (existingRelation) {
        throw new BadRequestException(
          `Relation between Profile ${dto.profile} and Functionality ${dto.funcionality} already exists`
        );
      }

      // Cria a relação
      const result = await this.prisma.profileFunctionality.create({
        data: {
          profileId: dto.profile,
          functionalityId: dto.funcionality,
        },
        include: {
          profile: true,
          functionality: true,
        },
      });

      results.push(result);
    }

    return results;
  }

  async findAll() {
    return this.prisma.profileFunctionality.findMany({
      include: {
        profile: true,
        functionality: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findByProfile(profileId: number) {
    // Verifica se o profile existe
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });
    
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    }

    return this.prisma.profileFunctionality.findMany({
      where: { profileId },
      include: {
        functionality: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async remove(id: number) {
    const profileFunctionality = await this.prisma.profileFunctionality.findUnique({
      where: { id },
    });

    if (!profileFunctionality) {
      throw new NotFoundException(`ProfileFunctionality with ID ${id} not found`);
    }

    return this.prisma.profileFunctionality.delete({
      where: { id },
    });
  }
}