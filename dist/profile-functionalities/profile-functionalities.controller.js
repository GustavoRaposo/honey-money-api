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
exports.ProfileFunctionalitiesController = void 0;
const common_1 = require("@nestjs/common");
const profile_functionalities_service_1 = require("./profile-functionalities.service");
let ProfileFunctionalitiesController = class ProfileFunctionalitiesController {
    constructor(profileFunctionalitiesService) {
        this.profileFunctionalitiesService = profileFunctionalitiesService;
    }
    create(createProfileFunctionalityDtos) {
        return this.profileFunctionalitiesService.create(createProfileFunctionalityDtos);
    }
    findAll() {
        return this.profileFunctionalitiesService.findAll();
    }
    findByProfile(profileId) {
        return this.profileFunctionalitiesService.findByProfile(profileId);
    }
    remove(id) {
        return this.profileFunctionalitiesService.remove(id);
    }
};
exports.ProfileFunctionalitiesController = ProfileFunctionalitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProfileFunctionalitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileFunctionalitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':profile'),
    __param(0, (0, common_1.Param)('profile', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileFunctionalitiesController.prototype, "findByProfile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileFunctionalitiesController.prototype, "remove", null);
exports.ProfileFunctionalitiesController = ProfileFunctionalitiesController = __decorate([
    (0, common_1.Controller)('profile-funcionalities'),
    __metadata("design:paramtypes", [profile_functionalities_service_1.ProfileFunctionalitiesService])
], ProfileFunctionalitiesController);
//# sourceMappingURL=profile-functionalities.controller.js.map