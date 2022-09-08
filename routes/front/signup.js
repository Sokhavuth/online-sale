// routes/front/signup.js
import express from 'express'
const signupRouter = express.Router()
import signup from '../../controllers/front/signup.js'

signupRouter.get('/',async (req,res)=>{
    signup.getItem(req,res)
})

signupRouter.post('/',async (req,res)=>{
    signup.registerItem(req,res)
})

signupRouter.get('/verify/:token',async (req,res)=>{
    signup.verifyToken(req,res)
})

signupRouter.post('/fbuser',async (req,res)=>{
    signup.postFBuser(req,res)
})

export default signupRouter