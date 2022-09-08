// controllers/admin/post.js
import config from '../../config.js'
import categorydb from '../../models/category.js'
import postdb from '../../models/post.js'

class Post{
    async getItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រទំនិញ'
        this.config.route = '/admin/post'
        this.config.type = 'post'
        this.config.user = req.session.user
        this.config.categories = await categorydb.getAllItem(req)

        if(this.config.user.role in {'Admin':1,'Editor':1}){
            this.config.count = await postdb.count(req)
            this.config.items = await postdb.getItem(req,this.config.maxPosts)
        }else if(this.config.user.role in {'Author':1}){
            const query = {userid:this.config.user.id}
            this.config.count = await postdb.count(req,query)
            this.config.items = await postdb.getItem(req,this.config.maxPosts,query)
        }

        res.render('base',{data:this.config})
    }

    async postItem(req,res){
        await postdb.postItem(req)
        res.redirect('/admin/post')
    }

    async editItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​កែប្រែ​ទំនិញ'
        this.config.route = '/admin/post'
        this.config.type = 'post'
        this.config.user = req.session.user
        this.config.categories = await categorydb.getAllItem(req)

        if(this.config.user.role in {'Admin':1,'Editor':1}){
            this.config.count = await postdb.count(req)
            this.config.item = await postdb.editItem(req)
            this.config.items = await postdb.getItem(req,this.config.maxPosts)
        }else if(this.config.user.role in {'Author':1}){
            const query = {userid:this.config.user.id}
            this.config.count = await postdb.count(req,query)
            this.config.item = await postdb.editItem(req)
            this.config.items = await postdb.getItem(req,this.config.maxPosts,query)
        }

        res.render('base',{data:this.config})
    }

    async updateItem(req,res){
        let item = await postdb.editItem(req)
        if((req.session.user.role === 'Admin')||(req.session.user.id === item.userid)){
            await postdb.updateItem(req)
        }

        res.redirect('/admin/post')
    }

    async deleteItem(req,res){
        let item = await postdb.editItem(req)
        if((req.session.user.role === 'Admin')||(req.session.user.id === item.userid)){
            await postdb.deleteItem(req)
        }

        res.redirect('/admin/post')
    }

    async paginateItem(req,res){
        this.config = await config()
        this.config.route = '/admin/post'
        this.config.type = 'post'

        this.config.items = await postdb.paginateItem(req,this.config.maxPosts)

        res.json(this.config)
    }
}

export default new Post()