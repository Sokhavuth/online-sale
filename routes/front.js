// routes/front.js
import express from 'express'
const frontRouter = express.Router()

import indexRouter from './front/index.js'
frontRouter.use('/',indexRouter)

import loginRouter from './front/login.js'
frontRouter.use('/login',loginRouter)

import signupRouter from './front/signup.js'
frontRouter.use('/signup',signupRouter)

export default frontRouter