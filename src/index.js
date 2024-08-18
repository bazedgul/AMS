import dotenv from 'dotenv'
import DB_Connect from "./db/index.js";
import express from 'express'
const app = express()


dotenv.config({
    path: './env'
})

// console.log(process.env.MONGODB_URI)

DB_Connect()
.then(()=>{
    app.listen(process.env.PORT || 6000, ()=>{
        console.log(`Server is running on port ${process.env.PORT || 6000}`)
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED !!!!", err)
})