// routes/admin/category.js
import express from 'express'
const categoryRouter = express.Router()
import category from '../../controllers/admin/category.js'

categoryRouter.get('/',async (req,res)=>{
    if(req.session.user){
        category.getItem(req,res)
    }else{
        res.redirect('/login')
    }
})

categoryRouter.post('/',async (req,res)=>{
    if(req.session.user){
        category.postItem(req,res)
    }else{
        res.redirect('/login')
    }
})

categoryRouter.get('/edit/:id',async (req,res)=>{
    if(req.session.user){
        category.editItem(req,res)
    }else{
        res.redirect('/login')
    }
})

categoryRouter.post('/edit/:id',async (req,res)=>{
    if(req.session.user){
        category.updateItem(req,res)
    }else{
        res.redirect('/login')
    }
})

categoryRouter.get('/delete/:id',async (req,res)=>{
    if(req.session.user){
        category.deleteItem(req,res)
    }else{
        res.redirect('/login')
    }
})

categoryRouter.post('/paginate',async (req,res)=>{
    if(req.session.user){
        category.paginateItem(req,res)
    }else{
        res.redirect('/login')
    }
})

export default categoryRouter