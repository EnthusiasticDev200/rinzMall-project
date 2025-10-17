import express from "express";

import { createProduct } from "../../controllers/adminController/createProducts.js";
import { verifyAccessToken, requireSuperUser } from '../../../middlewares/auth.js'
import { viewProducts } from "../../controllers/productController/viewProduct.js";



const router = express.Router()

// create and view products
router.post('/product/create',verifyAccessToken, requireSuperUser, createProduct )
router.get('/product/view', viewProducts)






export { router as adminRouter}
