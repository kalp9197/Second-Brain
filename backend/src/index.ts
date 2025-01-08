import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const app = express();
dotenv.config()

const PORT = process.env.PORT||5000
app.get('/',(req,res):any=>{
    res.send('hello')
})

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`)
})
