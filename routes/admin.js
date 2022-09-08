// routes/admin.js
import express from 'express'
const adminRouter = express.Router()

import postRouter from './admin/post.js'
adminRouter.use('/post',postRouter)

import categoryRouter from './admin/category.js'
adminRouter.use('/category',categoryRouter)

import uploadRouter from './admin/upload.js'
adminRouter.use('/upload',uploadRouter)

import userRouter from './admin/user.js'
adminRouter.use('/user',userRouter)

export default adminRouter