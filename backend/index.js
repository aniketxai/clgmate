import express from 'express'
import cors from 'cors'
 import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/productRoute.js'
import authRouter from './routes/authRouter.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/products',productRouter)
app.use('/api/auth',authRouter)
app.get('/',(req,res)=>{
    res.send("Api working")
})


// listen
app.listen(port,()=>{
    console.log('server is running on Port : '+ port)
})

