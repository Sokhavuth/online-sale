// controllers/admin/user.js
import config from "../../config.js"
import userdb from '../../models/user.js'

class User{
    async getItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​អ្នក​ប្រើប្រាស់'
        this.config.user = req.session.user
        this.config.route = '/admin/user'

        if(this.config.user.role in {'Admin':1,'Editor':1}){
            this.config.type = 'user'

            this.config.count = await userdb.count(req)
            this.config.items = await userdb.getItem(req,this.config.maxPosts)

        }else if(this.config.user.role === 'Author'){
            this.config.item =  await userdb.editItem(req,this.config.user.id)
        }

        res.render('base',{data:this.config})
    }

    async postItem(req,res){
        await userdb.postItem(req)
        res.redirect('/admin/user')
    }

    async editItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​អ្នក​ប្រើប្រាស់'
        this.config.user = req.session.user
        this.config.route = '/admin/user'

        if(this.config.user.role in {'Admin':1,'Editor':1}){
            this.config.type = 'user'

            this.config.count = await userdb.count(req)
            this.config.items = await userdb.getItem(req,this.config.maxPosts)
            this.config.item =  await userdb.editItem(req,req.params.id)

        }else if(this.config.user.role === 'Author'){
            this.config.item =  await userdb.editItem(req,req.params.id)
        }

        res.render('base',{data:this.config})
    }

    async updateItem(req,res){
        if(req.session.user.role in {'Admin':1,'Editor':1}){
            await userdb.updateItem(req)
        }else if(req.session.user.id === req.params.id){
            await userdb.updateAuthor(req)
        }

        res.redirect('/admin/user')
    }

    async deleteItem(req,res){
        if(req.session.user.role in {'Admin':1}){
            await userdb.deleteItem(req)
        }else if(req.session.user.id === req.params.id){
            await userdb.deleteItem(req)
        }

        res.redirect('/admin/user')
    }

    async paginateItem(req,res){
        this.config = await config()
        this.config.route = '/admin/user'
        this.config.type = 'user'

        this.config.items = await userdb.paginateItem(req,this.config.maxPosts)

        res.json(this.config)
    }

}

export default new User()