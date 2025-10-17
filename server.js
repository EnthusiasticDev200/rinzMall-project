import dotenv from 'dotenv'
import express from "express";
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import http from 'http'
import cors from 'cors'

//app module
import grantAccess from './backend/config/cors.js';
import apiRouter from './backend/routes/mainRoutes.js'


dotenv.config()

const app = express()
const server = http.createServer(app)


// setting up cors
app.use(cors({
    origin : function(origin, callback){
        if( !origin || grantAccess.includes(origin) ){
            callback (null, true)
        } else callback(new Error("Site not allowed by CORS"))
    },
    method : [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials : true
}))

// helmet set-up
if(process.env.NODE_ENV === 'production'){
  //Strict measure
  app.use(helmet())
}else{
  //Relaxed measure
  app.use(
    helmet({
      contentSecurityPolicy : {
        useDefaults : true,
        'script-src' : ['self', 'unsafe-inlie']
      }
    })
  )
}

// middleware
app.use(express.json())
app.use(cookieParser())


//routes
app.use('/v1', apiRouter)


const PORT = process.env.APP_PORT

//landing page
app.get('/', (req, res)=>{
    res.send('Thanks for patronizing Rinz Mall')
})

server.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})


// Catch invalid route
app.use((req, res)=>{
    res.status(404).json({
        success : false,
        error : " Route not found"
    })
})


//Error handling
app.use((err, req, res, next)=>{
    res.status(500).json({
        success : false,
        error : " Internal server error"
    })
})
