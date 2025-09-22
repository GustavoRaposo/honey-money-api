import { ProfileFunctionalitiesService } from './profile-functionalities.service';
import { CreateProfileFunctionalityDto } from './dto/create-profile-functionality.dto';
export declare class ProfileFunctionalitiesController {
    private readonly profileFunctionalitiesService;
    constructor(profileFunctionalitiesService: ProfileFunctionalitiesService);
    create(createProfileFunctionalityDtos: CreateProfileFunctionalityDto[]): Promise<any[]>;
    findAll(): Promise<({
        profile: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        functionality: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            description: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        profileId: number;
        functionalityId: number;
    })[]>;
    findByProfile(profileId: number): Promise<({
        functionality: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            description: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        profileId: number;
        functionalityId: number;
    })[]>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        profileId: number;
        functionalityId: number;
    }>;
}
