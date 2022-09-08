// routes/admin/post.js
import express from 'express'
const postRouter = express.Router()
import post from '../../controllers/admin/post.js'

postRouter.get('/',async (req,res)=>{
    if(req.session.user){
        post.getItem(req,res)
    }else{
        res.redirect('/login')
    }
})

postRouter.post('/',async (req,res)=>{
    if(req.session.user){
        post.postItem(req,res)
    }else{
        res.redirect('/login')
    }
})

postRouter.get('/edit/:id',async (req,res)=>{
    if(req.session.user){
        post.editItem(req,res)
    }else{
        res.redirect('/login')
    }
})

postRouter.post('/edit/:id',async (req,res)=>{
    if(req.session.user){
        post.updateItem(req,res)
    }else{
        res.redirect('/login')
    }
})

postRouter.get('/delete/:id',async (req,res)=>{
    if(req.session.user){
        post.deleteItem(req,res)
    }else{
        res.redirect('/login')
    }
})

postRouter.post('/paginate',async (req,res)=>{
    if(req.session.user){
        post.paginateItem(req,res)
    }else{
        res.redirect('/login')
    }
})

export default postRouter