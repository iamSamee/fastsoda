"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.vendorRoutes = router;
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log('Destination Working!!!');
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, new Date().toISOString().replace(/:/g, "-") + '_' + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
// console.log(images);
router.post('/login', controllers_1.vendorLogin);
router.get('/profile', middlewares_1.Authenticate, controllers_1.getVendorProfile);
router.patch('/profile', middlewares_1.Authenticate, controllers_1.updateVendorProfile);
router.patch('/coverImage', middlewares_1.Authenticate, images, controllers_1.updateVendorCoverImage);
router.patch('/service', middlewares_1.Authenticate, controllers_1.updateVendorService);
router.post('/food', middlewares_1.Authenticate, images, controllers_1.addFood);
router.get('/foods', middlewares_1.Authenticate, controllers_1.getFoods);
router.get('/', (req, res, next) => {
    res.json({ message: 'Hello From Vendor' });
});
//# sourceMappingURL=vendorRoutes.js.map