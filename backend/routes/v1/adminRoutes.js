import express from "express";


import { verifyAccessToken, requireSuperUser } from '../../../middlewares/auth.js'




const router = express.Router()



export { router as adminRouter}
