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
exports.FunctionalitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FunctionalitiesService = class FunctionalitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFunctionalityDto) {
        return this.prisma.functionality.create({
            data: createFunctionalityDto,
        });
    }
    async findAll() {
        return this.prisma.functionality.findMany({
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        const functionality = await this.prisma.functionality.findUnique({
            where: { id },
        });
        if (!functionality) {
            throw new common_1.NotFoundException(`Functionality with ID ${id} not found`);
        }
        return functionality;
    }
    async update(id, updateFunctionalityDto) {
        await this.findOne(id);
        return this.prisma.functionality.update({
            where: { id },
            data: updateFunctionalityDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.functionality.delete({
            where: { id },
        });
    }
};
exports.FunctionalitiesService = FunctionalitiesService;
exports.FunctionalitiesService = FunctionalitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FunctionalitiesService);
//# sourceMappingURL=functionalities.service.js.map