import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<AuthResponseDto>;
    validateToken(payload: any): Promise<{
        name: string;
        email: string;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshToken(refreshToken: string): Promise<AuthResponseDto>;
    logout(uuid: string): Promise<void>;
}
