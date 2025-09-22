"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        return this.userService.validateUser(email, password);
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user.uuid,
            name: user.name,
        };
        const refreshToken = (0, crypto_1.randomUUID)();
        await this.userService.saveRefreshToken(user.uuid, refreshToken);
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refreshToken,
            expires_in: 1800,
            user: {
                uuid: user.uuid,
                name: user.name,
                email: user.email,
            },
        };
    }
    async validateToken(payload) {
        return this.userService.findByEmail(payload.email);
    }
    async refreshToken(refreshToken) {
        const user = await this.userService.findByRefreshToken(refreshToken);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const payload = {
            email: user.email,
            sub: user.uuid,
            name: user.name,
        };
        const newRefreshToken = (0, crypto_1.randomUUID)();
        await this.userService.saveRefreshToken(user.uuid, newRefreshToken);
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: newRefreshToken,
            expires_in: 1800,
            user: {
                uuid: user.uuid,
                name: user.name,
                email: user.email,
            },
        };
    }
    async logout(uuid) {
        await this.userService.revokeRefreshToken(uuid);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map