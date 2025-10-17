import dotenv from 'dotenv'
import { Worker, Queue } from 'bullmq'
import sendOtpEmail from './mailer.js'
import Redis from 'ioredis'


dotenv.config()

let connection
if(process.env.NODE_ENV === 'development'){
    console.log('Worker running in development')
     connection = new Redis('127.0.0.1:6379', { maxRetriesPerRequest: null})
} 

const otpQueue = new Queue('otp-emails', { connection })

const otpWorker = new Worker('otp-emails',
    async job =>{
        const { email, otp } = job.data
        await sendOtpEmail(email, otp)
    }, {connection}
    
)


export default otpQueue;



















