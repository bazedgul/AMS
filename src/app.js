import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit:"16kb", extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


// Routes
import userRouter from './routes/user.routes.js'


// Routes Declaration
app.use('/api/v1/users', userRouter)
// https://localhost:8000/api/v1/users/register -> hum user.routes pe chlein jaege - konsa route mujhe call karna hai - register ya login ETC
// https://localhost:8000/users/login

export {app}