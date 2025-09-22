"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserProfilesService = class UserProfilesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserProfileDto) {
        const { userUuid, profileId } = createUserProfileDto;
        const user = await this.prisma.user.findUnique({
            where: { uuid: userUuid }
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId }
        });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil não encontrado');
        }
        const existingRelation = await this.prisma.userProfile.findFirst({
            where: {
                userUuid,
                profileId
            }
        });
        if (existingRelation) {
            throw new common_1.ConflictException('Relação entre usuário e perfil já existe');
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
    async findProfilesByUserUuid(userUuid) {
        const user = await this.prisma.user.findUnique({
            where: { uuid: userUuid }
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
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
    async findUsersByProfileId(profileId) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId }
        });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil não encontrado');
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
    async findFunctionalitiesByUserUuid(userUuid) {
        const user = await this.prisma.user.findUnique({
            where: { uuid: userUuid }
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
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
    async remove(id) {
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
            throw new common_1.NotFoundException('Relação não encontrada');
        }
        await this.prisma.userProfile.delete({
            where: { id }
        });
        return {
            message: 'Relação removida com sucesso',
            deletedRelation: userProfile
        };
    }
};
exports.UserProfilesService = UserProfilesService;
exports.UserProfilesService = UserProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserProfilesService);
//# sourceMappingURL=user-profiles.service.js.map