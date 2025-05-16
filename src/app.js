import express from "express"

import cors from "cors" //allows wh can make a request to the server

import cookieParser from "cookie-parser"

const app= express();

// middleware - in between configuration to do a certain task over the code
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes

import  userRegister  from "./routes/careGiver.routes.js";
import Registeruser from "./routes/careGiver.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js";
import payment from "./routes/careGiver.routes.js"
import client from "./routes/careGiver.routes.js"


app.use("/api/v1/caregiver",userRegister)
app.use("/api/v1/user",Registeruser)
app.use("/api/v1/payment",payment)
app.use("/api/v1/user",client)

app.use(errorHandler)
export { app }