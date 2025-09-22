import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
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

  async findOne(uuid: string) {
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
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async search(searchUserDto: SearchUserDto) {
    const where: any = {};

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

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    await this.findOne(uuid);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.uuid !== uuid) {
        throw new ConflictException('Email already exists');
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

  async remove(uuid: string) {
    await this.findOne(uuid);
    await this.prisma.user.delete({ where: { uuid } });
    return { message: 'User deleted successfully' };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async findByEmail(email: string) {
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

  async saveRefreshToken(uuid: string, refreshToken: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 dias de validade

    return this.prisma.user.update({
      where: { uuid },
      data: {
        refreshToken: await bcrypt.hash(refreshToken, 10),
        tokenExpiry: expiryDate,
      },
    });
  }

  async findByRefreshToken(refreshToken: string) {
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

  async revokeRefreshToken(uuid: string) {
    return this.prisma.user.update({
      where: { uuid },
      data: {
        refreshToken: null,
        tokenExpiry: null,
      },
    });
  }
}