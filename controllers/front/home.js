// controllers/front/home.js
import config from "../../config.js"
import categorydb from '../../models/category.js'
import postdb from '../../models/post.js'

class Home{
    async getItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រដើម'
        this.config.route = '/'

        this.config.categories = await categorydb.getAllItem(req)
        this.config.items = await postdb.getItem(req,this.config.frontPosts)

        res.render('base',{data:this.config})
    }

    async navigateItem(req,res){
        this.config = await config()
        this.config.items = await postdb.paginateItem(req,this.config.frontPosts)
        res.json(this.config)
    }

    async getSingle(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​ទំនិញ'
        this.config.route = '/post'

        this.config.categories = await categorydb.getAllItem(req)
        this.config.item = await postdb.editItem(req,req.params.id)
        this.config.items = await postdb.getRelatedItem(req,this.config.item.categories,this.config.relatedPosts)
    
        res.render('base',{data:this.config})
    }

    async getPostByCategory(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រប្រភេទ​ទំនិញ'
        this.config.route = '/category'
        this.config.name = req.params.name

        this.config.categories = await categorydb.getAllItem(req)
        this.config.items = await postdb.getRelatedItem(req,[req.params.name],this.config.maxCategories)
        
        res.render('base',{data:this.config})
    }

    async navigateCategory(req,res){
        const items = await postdb.navigateCategory(req,[req.body.name],this.config.maxCategories)
        res.json(items)
    }

    async searchItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​ស្វែង​រក'
        this.config.route = '/search'

        this.config.categories = await categorydb.getAllItem(req)
        this.config.items = await postdb.searchItem(req,this.config.maxSearch)
        
        res.render('base',{data:this.config})
    }
}

export default new Home()