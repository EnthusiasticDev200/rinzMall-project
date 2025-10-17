import express from "express";

import { createProduct, viewProducts } from "../../controllers/productController/products.js";
import { verifyAccessToken,requireSuperUser } from "../../../middlewares/auth.js";




const router = express.Router()


router.post('/product/create', verifyAccessToken,requireSuperUser,createProduct)

router.get('/product/view', viewProducts)





export { router as productRouter}




























