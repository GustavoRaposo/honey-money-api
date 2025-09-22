import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        uuid: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(uuid: string): Promise<{
        name: string;
        email: string;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    search(searchUserDto: SearchUserDto): Promise<{
        name: string;
        email: string;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(uuid: string): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        name: string;
        email: string;
        uuid: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    saveRefreshToken(uuid: string, refreshToken: string): Promise<{
        name: string;
        email: string;
        password: string;
        uuid: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByRefreshToken(refreshToken: string): Promise<{
        name: string;
        email: string;
        password: string;
        uuid: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    revokeRefreshToken(uuid: string): Promise<{
        name: string;
        email: string;
        password: string;
        uuid: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
