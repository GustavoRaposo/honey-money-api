"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFunctionalityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_functionality_dto_1 = require("./create-functionality.dto");
class UpdateFunctionalityDto extends (0, mapped_types_1.PartialType)(create_functionality_dto_1.CreateFunctionalityDto) {
}
exports.UpdateFunctionalityDto = UpdateFunctionalityDto;
//# sourceMappingURL=update-functionality.dto.js.map