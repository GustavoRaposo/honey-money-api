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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
        const { password, ...result } = user;
        return result;
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                uuid: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findOne(uuid) {
        const user = await this.prisma.user.findUnique({
            where: { uuid },
            select: {
                uuid: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async search(searchUserDto) {
        const where = {};
        if (searchUserDto.name) {
            where.name = { contains: searchUserDto.name };
        }
        if (searchUserDto.email) {
            where.email = { contains: searchUserDto.email };
        }
        return this.prisma.user.findMany({
            where,
            select: {
                uuid: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async update(uuid, updateUserDto) {
        await this.findOne(uuid);
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        if (updateUserDto.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: updateUserDto.email },
            });
            if (existingUser && existingUser.uuid !== uuid) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        return this.prisma.user.update({
            where: { uuid },
            data: updateUserDto,
            select: {
                uuid: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async remove(uuid) {
        await this.findOne(uuid);
        await this.prisma.user.delete({ where: { uuid } });
        return { message: 'User deleted successfully' };
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: {
                uuid: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async saveRefreshToken(uuid, refreshToken) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        return this.prisma.user.update({
            where: { uuid },
            data: {
                refreshToken: await bcrypt.hash(refreshToken, 10),
                tokenExpiry: expiryDate,
            },
        });
    }
    async findByRefreshToken(refreshToken) {
        const users = await this.prisma.user.findMany({
            where: {
                refreshToken: { not: null },
                tokenExpiry: { gte: new Date() },
            },
        });
        for (const user of users) {
            if (user.refreshToken && await bcrypt.compare(refreshToken, user.refreshToken)) {
                return user;
            }
        }
        return null;
    }
    async revokeRefreshToken(uuid) {
        return this.prisma.user.update({
            where: { uuid },
            data: {
                refreshToken: null,
                tokenExpiry: null,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map