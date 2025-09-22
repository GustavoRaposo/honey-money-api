import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<AuthResponseDto>;
    validateToken(payload: any): Promise<{
        uuid: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshToken(refreshToken: string): Promise<AuthResponseDto>;
    logout(uuid: string): Promise<void>;
}
