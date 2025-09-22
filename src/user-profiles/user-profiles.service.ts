import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';

@Injectable()
export class UserProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(createUserProfileDto: CreateUserProfileDto) {
    const { userUuid, profileId } = createUserProfileDto;

    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o perfil existe
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }

    // Verificar se a relação já existe
    const existingRelation = await this.prisma.userProfile.findFirst({
      where: {
        userUuid,
        profileId
      }
    });

    if (existingRelation) {
      throw new ConflictException('Relação entre usuário e perfil já existe');
    }

    return this.prisma.userProfile.create({
      data: createUserProfileDto,
      include: {
        user: {
          select: {
            uuid: true,
            name: true,
            email: true
          }
        },
        profile: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }

  async findProfilesByUserUuid(userUuid: string) {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const userProfiles = await this.prisma.userProfile.findMany({
      where: { userUuid },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });

    return {
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email
      },
      profiles: userProfiles.map(up => up.profile)
    };
  }

  async findUsersByProfileId(profileId: number) {
    // Verificar se o perfil existe
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }

    const userProfiles = await this.prisma.userProfile.findMany({
      where: { profileId },
      include: {
        user: {
          select: {
            uuid: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });

    return {
      profile: {
        id: profile.id,
        name: profile.name
      },
      users: userProfiles.map(up => up.user)
    };
  }

  async findFunctionalitiesByUserUuid(userUuid: string) {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Buscar todos os perfis do usuário com suas funcionalidades
    const userProfiles = await this.prisma.userProfile.findMany({
      where: { userUuid },
      include: {
        profile: {
          include: {
            profileFunctionalities: {
              include: {
                functionality: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Extrair todas as funcionalidades e remover duplicatas
    const functionalitiesMap = new Map();
    
    userProfiles.forEach(userProfile => {
      userProfile.profile.profileFunctionalities.forEach(pf => {
        const functionality = pf.functionality;
        if (!functionalitiesMap.has(functionality.id)) {
          functionalitiesMap.set(functionality.id, functionality);
        }
      });
    });

    const uniqueFunctionalities = Array.from(functionalitiesMap.values());

    return {
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email
      },
      profiles: userProfiles.map(up => ({
        id: up.profile.id,
        name: up.profile.name
      })),
      functionalities: uniqueFunctionalities
    };
  }

  async remove(id: number) {
    const userProfile = await this.prisma.userProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            uuid: true,
            name: true,
            email: true
          }
        },
        profile: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!userProfile) {
      throw new NotFoundException('Relação não encontrada');
    }

    await this.prisma.userProfile.delete({
      where: { id }
    });

    return {
      message: 'Relação removida com sucesso',
      deletedRelation: userProfile
    };
  }
}
