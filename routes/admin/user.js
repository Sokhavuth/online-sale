// routes/admin/user.js
import express from 'express'
const userRouter = express.Router()
import user from '../../controllers/admin/user.js'

userRouter.get('/',async (req,res)=>{
    if(req.session.user){
        user.getItem(req,res)
    }else{
        res.redirect('/login')
    }
})

userRouter.post('/',async (req,res)=>{
    if(req.session.user){
        user.postItem(req,res)
    }else{
        res.redirect('/login')
    }
})

userRouter.get('/edit/:id',async (req,res)=>{
    if(req.session.user){
        user.editItem(req,res)
    }else{
        res.redirect('/login')
    }
})

userRouter.post('/edit/:id',async (req,res)=>{
    if(req.session.user){
        user.updateItem(req,res)
    }else{
        res.redirect('/login')
    }
})

userRouter.get('/delete/:id',async (req,res)=>{
    if(req.session.user){
        user.deleteItem(req,res)
    }else{
        res.redirect('/login')
    }
})

userRouter.post('/paginate',async (req,res)=>{
    if(req.session.user){
        user.paginateItem(req,res)
    }else{
        res.redirect('/login')
    }
})

export default userRouter