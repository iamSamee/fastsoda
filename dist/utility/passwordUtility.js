"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = exports.validatePassword = exports.generatePassword = exports.generateSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const generateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.generateSalt = generateSalt;
const generatePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.generatePassword = generatePassword;
const validatePassword = (password, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.generatePassword)(password, salt)) === savedPassword;
});
exports.validatePassword = validatePassword;
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.APP_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const validateToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('Authorization');
    if (token) {
        const payload = yield jsonwebtoken_1.default.verify(token.split(' ')[1], config_1.APP_SECRET);
        req.user = payload;
        return true;
    }
    return false;
});
exports.validateToken = validateToken;
//# sourceMappingURL=passwordUtility.js.map