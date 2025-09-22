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
exports.FunctionalitiesController = void 0;
const common_1 = require("@nestjs/common");
const functionalities_service_1 = require("./functionalities.service");
const create_functionality_dto_1 = require("./dto/create-functionality.dto");
const update_functionality_dto_1 = require("./dto/update-functionality.dto");
let FunctionalitiesController = class FunctionalitiesController {
    constructor(functionalitiesService) {
        this.functionalitiesService = functionalitiesService;
    }
    create(createFunctionalityDto) {
        return this.functionalitiesService.create(createFunctionalityDto);
    }
    findAll() {
        return this.functionalitiesService.findAll();
    }
    findOne(id) {
        return this.functionalitiesService.findOne(id);
    }
    update(id, updateFunctionalityDto) {
        return this.functionalitiesService.update(id, updateFunctionalityDto);
    }
    remove(id) {
        return this.functionalitiesService.remove(id);
    }
};
exports.FunctionalitiesController = FunctionalitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_functionality_dto_1.CreateFunctionalityDto]),
    __metadata("design:returntype", void 0)
], FunctionalitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FunctionalitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FunctionalitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_functionality_dto_1.UpdateFunctionalityDto]),
    __metadata("design:returntype", void 0)
], FunctionalitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FunctionalitiesController.prototype, "remove", null);
exports.FunctionalitiesController = FunctionalitiesController = __decorate([
    (0, common_1.Controller)('funcionalities'),
    __metadata("design:paramtypes", [functionalities_service_1.FunctionalitiesService])
], FunctionalitiesController);
//# sourceMappingURL=functionalities.controller.js.map