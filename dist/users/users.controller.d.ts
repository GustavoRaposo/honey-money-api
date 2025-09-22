import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    search(searchUserDto: SearchUserDto): Promise<{
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
}
