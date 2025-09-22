import { PrismaService } from '../prisma/prisma.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';
export declare class FunctionalitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createFunctionalityDto: CreateFunctionalityDto): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string;
    }>;
    findAll(): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string;
    }>;
    update(id: number, updateFunctionalityDto: UpdateFunctionalityDto): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string;
    }>;
    remove(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string;
    }>;
}
