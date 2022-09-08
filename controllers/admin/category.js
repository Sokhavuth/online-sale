// controllers/admin/category.js
import config from "../../config.js"
import categorydb from '../../models/category.js'

class Category{
    async getItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​ប្រភេទ​ទំនិញ'
        this.config.route = '/admin/category'
        this.config.type = 'category'
        this.config.user = req.session.user

        if(req.session.user.role in {'Admin':1,'Editor':1}){
            this.config.count = await categorydb.count(req)
            this.config.items = await categorydb.getItem(req,this.config.maxPosts)
        }

        res.render('base',{data:this.config})
    }

    async postItem(req,res){
        if(req.session.user.role in {'Admin':1}){
            await categorydb.postItem(req)
        }
        res.redirect('/admin/category')
    }

    async editItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​កែប្រែ​ប្រភេទ​ទំនិញ'
        this.config.route = '/admin/category'
        this.config.type = 'category'
        this.config.user = req.session.user

        if(req.session.user.role in {'Admin':1,'Editor':1}){
            this.config.count = await categorydb.count(req)
            this.config.item = await categorydb.editItem(req)
            this.config.items = await categorydb.getItem(req,this.config.maxPosts)
        }

        res.render('base',{data:this.config})
    }

    async updateItem(req,res){
        if(req.session.user.role === 'Admin'){
            await categorydb.updateItem(req)
        }

        res.redirect('/admin/category')
    }

    async deleteItem(req,res){
        if(req.session.user.role === 'Admin'){
            await categorydb.deleteItem(req)
        }

        res.redirect('/admin/category')
    }

    async paginateItem(req,res){
        this.config = await config()
        this.config.route = '/admin/category'
        this.config.type = 'category'

        this.config.items = await categorydb.paginateItem(req,this.config.maxPosts)

        res.json(this.config)
    }
}

export default new Category()