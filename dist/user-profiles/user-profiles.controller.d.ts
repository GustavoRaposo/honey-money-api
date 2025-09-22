import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
export declare class UserProfilesController {
    private readonly userProfilesService;
    constructor(userProfilesService: UserProfilesService);
    create(createUserProfileDto: CreateUserProfileDto): Promise<{
        user: {
            name: string;
            email: string;
            uuid: string;
        };
        profile: {
            name: string;
            id: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        profileId: number;
        userUuid: string;
    }>;
    findProfilesByUserUuid(uuid: string): Promise<{
        user: {
            uuid: string;
            name: string;
            email: string;
        };
        profiles: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        }[];
    }>;
    findFunctionalitiesByUserUuid(uuid: string): Promise<{
        user: {
            uuid: string;
            name: string;
            email: string;
        };
        profiles: {
            id: number;
            name: string;
        }[];
        functionalities: any[];
    }>;
    findUsersByProfileId(id: number): Promise<{
        profile: {
            id: number;
            name: string;
        };
        users: {
            name: string;
            email: string;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    remove(id: number): Promise<{
        message: string;
        deletedRelation: {
            user: {
                name: string;
                email: string;
                uuid: string;
            };
            profile: {
                name: string;
                id: number;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            profileId: number;
            userUuid: string;
        };
    }>;
}
