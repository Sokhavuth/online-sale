// routes/front/login.js
import express from "express"
const loginRouter = express.Router()
import login from '../../controllers/front/login.js'

loginRouter.get('/',async (req,res)=>{
    if(req.session.user){
        res.redirect('/admin/post')
    }else{
        login.getItem(req,res)
    }
})

loginRouter.post('/',async (req,res)=>{
    login.checkUser(req,res)
})

loginRouter.post('/fbuser',async (req,res)=>{
    login.checkFBuser(req,res)
})

loginRouter.get('/logout',async (req,res)=>{
    if(req.session.user){
        req.session.destroy()
        res.redirect('/')
    }else{
        res.redirect('/login')
    }
})

export default loginRouter