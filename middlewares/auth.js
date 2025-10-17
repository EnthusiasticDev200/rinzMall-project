import dotenv from 'dotenv'
import  jwt, { decode } from 'jsonwebtoken'

dotenv.config()

const verifyAccessToken = ( req, res, next )=>{
    try{
        const accessToken = req.cookies.admin_token || req.cookies.customer_token
        if ( !accessToken) return res.status(401).json({message: 'Access token expired or not found'})
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET, {
            algorithms: ['HS256']})
        // admin data
        req.adminId = decoded.adminId
        req.adminUsername = decoded.adminUsername
        req.role = decoded.role
        //customer data
        req.customerId = decoded.customerId
        req.customerUsername = decoded.customerUsername

        if( !req.adminUsername && !req.customerUsername ) return res.status(401).json({
            message: "Authorization required"})
        next()
    }catch(err){
        return res.status(400).json({message : "Invalid token"})
    }
}


const verifyRefreshToken = async ( req, res, next ) =>{
    try{
        const refreshToken = req.cookies.refresh_admin_token || req.cookies.refresh_customer_token
        if( !refreshToken ) return res.status(401).json({
            message : "No refresh token found"
        })
        const decoded =jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, {
            algorithms : ['HS256']
        })
        req.adminId = decoded.adminId
        req.adminUsername = decoded.adminUsername

        req.customerId = decoded.customerId
        req.customerUsername = decoded.customerUsername
        if( !req.adminId && !req.customerId ) return res.status(401).json({
            message: "Expired or Invalid token"})
        next()
    }catch(err){
        console.log("Error verifying refresh token", err.stack)
        return res.status(500).json({message : "Refresh token verification failed"})
    }
    
}

const requireSuperUser = ( req, res, next ) =>{
    const role = req.role
   if ( role !== process.env.ROLE ) return res.status(403).json({
        message : 'Restricted route'
   })
   next()

}
const customerOnly = ( req, res, next ) =>{
    const customerId = req.customerId
   if ( !customerId ) return res.status(403).json({
        message : 'Strictly for customer'
   })
   next()
}







export {
    verifyAccessToken, verifyRefreshToken, requireSuperUser,
    customerOnly
}