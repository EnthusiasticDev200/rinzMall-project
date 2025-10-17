import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

let redis;
if(process.env.NODE_ENV === 'development'){
    console.log('Redis running on  DEVELOPMENT')
    redis = new Redis({
        host : '127.0.0.1',
        port : '6379'
    })
}



export default redis
 