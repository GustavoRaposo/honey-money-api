import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.validateUser(email, password);
  }

  async login(user: any): Promise<AuthResponseDto> {
    const payload = {
      email: user.email,
      sub: user.uuid,
      name: user.name,
    };

    // Gerar refresh token
    const refreshToken = randomUUID();
    
    // Salvar refresh token no banco
    await this.userService.saveRefreshToken(user.uuid, refreshToken);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      expires_in: 1800, // 30 minutos em segundos
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
      },
    };
  }

  async validateToken(payload: any) {
    return this.userService.findByEmail(payload.email);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    // Verificar se o refresh token é válido
    const user = await this.userService.findByRefreshToken(refreshToken);
    
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Gerar novo access token
    const payload = {
      email: user.email,
      sub: user.uuid,
      name: user.name,
    };

    // Gerar novo refresh token
    const newRefreshToken = randomUUID();
    
    // Atualizar refresh token no banco
    await this.userService.saveRefreshToken(user.uuid, newRefreshToken);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: newRefreshToken,
      expires_in: 1800, // 30 minutos em segundos
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
      },
    };
  }

  async logout(uuid: string): Promise<void> {
    await this.userService.revokeRefreshToken(uuid);
  }
}
