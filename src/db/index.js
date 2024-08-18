import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const DB_Connect = async () =>{
    try {
        const ConnectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`)
        console.log(`MongoDB Connected...!!! ${ConnectionInstances.connection.host}`)
    } catch (error) {
        console.log("Database Connection Failed !!!!   ",error)
        process.exit(1)
    }
}

export default DB_Connect


