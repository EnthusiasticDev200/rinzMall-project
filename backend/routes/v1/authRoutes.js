import express from "express";


import { signUpAdmin, signInAdmin, logoutAdmin, refreshTokens, 
    signUpCustomer, signInCustomer, logoutCustomer, sendOtp,
    verifyOtp, changePassword} 
    from "../../controllers/auth/authController.js";

import { verifyAccessToken, verifyRefreshToken, requireSuperUser, 
    customerOnly
 } from "../../../middlewares/auth.js";


const router = express.Router()




//admin 
router.post('/admin/create', signUpAdmin)
router.post('/admin/signin', signInAdmin)
router.post('/admin/signout', verifyAccessToken, logoutAdmin)

//customer
router.post('/customer/signup', signUpCustomer)
router.post('/customer/signin', signInCustomer)
router.post('/customer/signout', verifyAccessToken, logoutCustomer)

//refresh token
router.post('/token/refresh', verifyRefreshToken, refreshTokens)

// otp 
router.post('/sendotp', sendOtp)
router.post('/verifyotp', verifyOtp)

// change password
router.put('/password/update', changePassword)





export { router as authRouter }

