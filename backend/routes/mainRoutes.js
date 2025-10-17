import express from "express";
import { authRouter } from "./v1/authRoutes.js";
import { adminRouter } from "./v1/adminRoutes.js";
import { customerRouter } from "./v1/customerRoutes.js";
import { productRouter } from "./v1/productRoutes.js";


const router = express.Router()




// auth 
router.use('/auth', authRouter)

// admin
router.use('/api/', adminRouter)

//customer
router.use('/api', customerRouter)

//product
router.use('/api', productRouter)







export default router
