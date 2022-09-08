// controller/admin/upload.js
import config from '../../config.js'

class Upload{
    async getItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ Upload'
        this.config.route = '/admin/upload'
        this.config.user = req.session.user

        res.render('base',{data:this.config})
    }

    async postItem(req,res){
        const file = req.file
        if(!file){
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }

        this.config.pageTitle = 'ទំព័រ​ Upload'
        this.config.route = '/admin/upload'
        this.config.fileUrl = '/uploads/' + file.filename
        this.config.user = req.session.user

        res.render('base',{data:this.config})
    }
}

export default new Upload()