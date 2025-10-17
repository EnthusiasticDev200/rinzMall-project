import express from 'express';
import { verifyAccessToken } from '../../../middlewares/auth.js'
import { viewProducts } from "../../controllers/productController/viewProduct.js";



const router = express.Router()


router.get('/product/view', viewProducts)









export { router as customerRouter }