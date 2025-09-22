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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfilesController = void 0;
const common_1 = require("@nestjs/common");
const user_profiles_service_1 = require("./user-profiles.service");
const create_user_profile_dto_1 = require("./dto/create-user-profile.dto");
let UserProfilesController = class UserProfilesController {
    constructor(userProfilesService) {
        this.userProfilesService = userProfilesService;
    }
    create(createUserProfileDto) {
        return this.userProfilesService.create(createUserProfileDto);
    }
    findProfilesByUserUuid(uuid) {
        return this.userProfilesService.findProfilesByUserUuid(uuid);
    }
    findFunctionalitiesByUserUuid(uuid) {
        return this.userProfilesService.findFunctionalitiesByUserUuid(uuid);
    }
    findUsersByProfileId(id) {
        return this.userProfilesService.findUsersByProfileId(id);
    }
    remove(id) {
        return this.userProfilesService.remove(id);
    }
};
exports.UserProfilesController = UserProfilesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_profile_dto_1.CreateUserProfileDto]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('profiles/:uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "findProfilesByUserUuid", null);
__decorate([
    (0, common_1.Get)('profiles/:uuid/functionalities'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "findFunctionalitiesByUserUuid", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "findUsersByProfileId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "remove", null);
exports.UserProfilesController = UserProfilesController = __decorate([
    (0, common_1.Controller)('user_profiles'),
    __metadata("design:paramtypes", [user_profiles_service_1.UserProfilesService])
], UserProfilesController);
//# sourceMappingURL=user-profiles.controller.js.map