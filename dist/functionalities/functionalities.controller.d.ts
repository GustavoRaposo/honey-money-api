import { FunctionalitiesService } from './functionalities.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';
export declare class FunctionalitiesController {
    private readonly functionalitiesService;
    constructor(functionalitiesService: FunctionalitiesService);
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
