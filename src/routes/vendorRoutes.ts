import express, { Request, Response, NextFunction } from 'express';
import { addFood, getFoods, getVendorProfile, updateVendorCoverImage, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer';

const router = express.Router();


const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('Destination Working!!!');
        cb(null, './images')
    },
    filename: function(req, file, cb){
        // console.log(file);
        cb(null, new Date().toISOString().replace(/:/g, "-") + '_' + file.originalname);
    }
})

const images = multer({storage: imageStorage}).array('images', 10)
// console.log(images);


router.post('/login', vendorLogin);

router.get('/profile', Authenticate, getVendorProfile);
router.patch('/profile', Authenticate, updateVendorProfile);
router.patch('/coverImage', Authenticate, images, updateVendorCoverImage);
router.patch('/service', Authenticate, updateVendorService);

router.post('/food',Authenticate, images, addFood);
router.get('/foods',Authenticate, getFoods);
 
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message: 'Hello From Vendor'});
})

export { router as vendorRoutes }