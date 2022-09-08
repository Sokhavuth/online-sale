// routes/admin/upload.js
// npm install multer
import path from 'path'
import express from 'express'
const uploadRouter = express.Router()
import upload from '../../controllers/admin/upload.js'

uploadRouter.get('/',async (req,res)=>{
    if(req.session.user){
        upload.getItem(req,res)
    }else{
        res.redirect('/login')
    }
})

import multer from 'multer'

const __dirname = path.resolve()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'static/uploads/'))
    },
    filename: function (req, file, cb) {
        const id = Date.now() + Math.round(Math.random() * 1E9).toString()
        cb(null, id + '-' + file.originalname)
    }
})
  
const _upload = multer({storage: storage})

uploadRouter.post('/',_upload.single("uploadFile"),async function(req,res,next){
    if(req.session.user){
        upload.postItem(req,res)
    }else{
        res.redirect('/login')
    }
})

export default uploadRouter