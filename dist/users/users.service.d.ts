import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        uuid: string;
        name: string;
        email: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        uuid: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(uuid: string): Promise<{
        uuid: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    search(searchUserDto: SearchUserDto): Promise<{
        uuid: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<{
        uuid: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(uuid: string): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        uuid: string;
        name: string;
        email: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        uuid: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    saveRefreshToken(uuid: string, refreshToken: string): Promise<{
        uuid: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByRefreshToken(refreshToken: string): Promise<{
        uuid: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    revokeRefreshToken(uuid: string): Promise<{
        uuid: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
