"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.adminRoutes = router;
router.get('/', (req, res, next) => {
    res.json({ message: 'Hello From Admin' });
});
router.post('/vendor', controllers_1.createVendor);
router.get('/vendors', controllers_1.getVendors);
router.get('/vendor/:id', controllers_1.getVendorById);
//# sourceMappingURL=adminRoutes.js.map