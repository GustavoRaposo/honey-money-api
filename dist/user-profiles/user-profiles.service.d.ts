import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
export declare class UserProfilesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findProfilesByUserUuid(userUuid: string): Promise<{
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
    findUsersByProfileId(profileId: number): Promise<{
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
    findFunctionalitiesByUserUuid(userUuid: string): Promise<{
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
