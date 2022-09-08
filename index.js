// index.js
// npm install express
// npm install express-session
// npm install connect-mongo
// npm install ejs

import express from 'express'
const app = express()

import mydb from './models/conMongoDB.js'
app.use('/',async function(req,res,next){
    req.mydb = await mydb
    next()
})

import dotenv from 'dotenv'
dotenv.config()
import session from 'express-session'
import MongoStore from 'connect-mongo'
app.use(session({
  store: MongoStore.create({mongoUrl:process.env.DATABASE_URI}),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))

import path from 'path'
const __dirname = path.resolve()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

import frontRouter from './routes/front.js'
import adminRouter from './routes/admin.js'
app.use('/',frontRouter)
app.use('/admin',adminRouter)

const port = process.env.PORT || 8000
app.listen(port,()=>{
  console.log(`This app is listening to the port ${port}`)
})

export default app