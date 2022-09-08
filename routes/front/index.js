// routes/front/home.js
import express from 'express'
const indexRouter = express.Router()
import home from '../../controllers/front/home.js'

indexRouter.get('/',async (req,res)=>{
    home.getItem(req,res)
})

indexRouter.post('/',async (req,res)=>{
    home.navigateItem(req,res)
})

indexRouter.get('/post/:id',async (req,res)=>{
    home.getSingle(req,res)
})

indexRouter.get('/category/:name',async (req,res)=>{
    home.getPostByCategory(req,res)
})

indexRouter.post('/navigate',async (req,res)=>{
    home.navigateCategory(req,res)
})

indexRouter.post('/search',async (req,res)=>{
    home.searchItem(req,res)
})

export default indexRouter