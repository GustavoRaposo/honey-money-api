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
exports.ProfileFunctionalitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileFunctionalitiesService = class ProfileFunctionalitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProfileFunctionalityDtos) {
        const results = [];
        for (const dto of createProfileFunctionalityDtos) {
            const profile = await this.prisma.profile.findUnique({
                where: { id: dto.profile },
            });
            if (!profile) {
                throw new common_1.NotFoundException(`Profile with ID ${dto.profile} not found`);
            }
            const functionality = await this.prisma.functionality.findUnique({
                where: { id: dto.funcionality },
            });
            if (!functionality) {
                throw new common_1.NotFoundException(`Functionality with ID ${dto.funcionality} not found`);
            }
            const existingRelation = await this.prisma.profileFunctionality.findFirst({
                where: {
                    profileId: dto.profile,
                    functionalityId: dto.funcionality,
                },
            });
            if (existingRelation) {
                throw new common_1.BadRequestException(`Relation between Profile ${dto.profile} and Functionality ${dto.funcionality} already exists`);
            }
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
    async findByProfile(profileId) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId },
        });
        if (!profile) {
            throw new common_1.NotFoundException(`Profile with ID ${profileId} not found`);
        }
        return this.prisma.profileFunctionality.findMany({
            where: { profileId },
            include: {
                functionality: true,
            },
            orderBy: { id: 'asc' },
        });
    }
    async remove(id) {
        const profileFunctionality = await this.prisma.profileFunctionality.findUnique({
            where: { id },
        });
        if (!profileFunctionality) {
            throw new common_1.NotFoundException(`ProfileFunctionality with ID ${id} not found`);
        }
        return this.prisma.profileFunctionality.delete({
            where: { id },
        });
    }
};
exports.ProfileFunctionalitiesService = ProfileFunctionalitiesService;
exports.ProfileFunctionalitiesService = ProfileFunctionalitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileFunctionalitiesService);
//# sourceMappingURL=profile-functionalities.service.js.map