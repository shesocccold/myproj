import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentsRoute from './routes/comment.js'
import fileUpload from 'express-fileupload'

const app=express()
dotenv.config()
//constants
const PORT =process.env.PORT||3005
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_NAME=process.env.DB_NAME

//middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))


app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentsRoute)

async function start(){
  
        await mongoose.connect('mongodb+srv://test:test123@cluster0.ijvmhlw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        app.listen(3006, ()=> console.log('Server started on port: 3006'))
 
  }
    
start()
/*
app.get('/', (req,res)=> {   
res.json({message:'All is fine.2'})
})
*/
//router