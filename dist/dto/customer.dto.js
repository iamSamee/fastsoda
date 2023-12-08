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
exports.editCustomerProfileInputs = exports.userLoginInputs = exports.createCustomerInputs = void 0;
const class_validator_1 = require("class-validator");
class createCustomerInputs {
}
exports.createCustomerInputs = createCustomerInputs;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], createCustomerInputs.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(8, 12),
    __metadata("design:type", String)
], createCustomerInputs.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.Length)(8, 15),
    __metadata("design:type", String)
], createCustomerInputs.prototype, "password", void 0);
class userLoginInputs {
}
exports.userLoginInputs = userLoginInputs;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], userLoginInputs.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(8, 15),
    __metadata("design:type", String)
], userLoginInputs.prototype, "password", void 0);
class editCustomerProfileInputs {
}
exports.editCustomerProfileInputs = editCustomerProfileInputs;
__decorate([
    (0, class_validator_1.Length)(3, 12),
    __metadata("design:type", String)
], editCustomerProfileInputs.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 15),
    __metadata("design:type", String)
], editCustomerProfileInputs.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 15),
    __metadata("design:type", String)
], editCustomerProfileInputs.prototype, "address", void 0);
//# sourceMappingURL=customer.dto.js.map