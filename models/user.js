// models/user.js
// npm install bcryptjs
import bcrypt from 'bcryptjs'

class User{
    async checkUser(req){
        const query = {email:req.body.email}
        return await req.mydb.collection("users").findOne(query)
    }

    async count(req){
        return await req.mydb.collection('users').countDocuments()
    }

    async postItem(req){
        const id = Date.now() + Math.round(Math.random() * 1E9).toString()
        const hashPassword = bcrypt.hashSync(req.body.password, 12)

        let newUser = {
            id: id, 
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            postdate: req.body.datetime,
            role: req.body.category,
            email: req.body.email,
            password: hashPassword,
        }
 
        await req.mydb.collection("users").insertOne(newUser)
    }

    async registerItem(req){
        const id = Date.now() + Math.round(Math.random() * 1E9).toString()
        const hashPassword = bcrypt.hashSync(req.body.password, 12)

        if(req.body.thumb){
            var thumb = req.body.thumb
        }else{
            var thumb = '/images/userthumb.png'
        }

        const now = new Date();
        const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 16)

        let newUser = {
            id: id, 
            title: req.body.title,
            content: null,
            thumb: thumb,
            postdate: date,
            role: 'subscriber',
            email: req.body.email,
            password: hashPassword,
        }
 
        await req.mydb.collection("users").insertOne(newUser)
        return id
    }

    async upgradeItem(req,userid){
        await req.mydb.collection("users").updateOne({id:userid},{$set:{role:'Author'}})
    }

    async getItem(req,amount){
        return await req.mydb.collection("users").find().sort({date:-1,_id:-1}).limit(amount).toArray()
    }

    async editItem(req,userid){
        return await req.mydb.collection('users').findOne({id:userid})
    }

    async updateItem(req){
        let myquery = {id: req.params.id}

        const user = await req.mydb.collection('users').findOne({id:req.params.id})

        if(req.body.password === user.password){
            var hashPassword = req.body.password
        }else{
            var hashPassword = bcrypt.hashSync(req.body.password, 12)
        }

        let newvalue = {$set: {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            postdate: req.body.datetime,
            role: req.body.category,
            email: req.body.email,
            password: hashPassword
        }}
 
        await req.mydb.collection("users").updateOne(myquery,newvalue)
    }

    async updateAuthor(req){
        let myquery = {id: req.params.id}

        if(req.body.password === req.session.user.password){
            var hashPassword = req.body.password
        }else{
            var hashPassword = bcrypt.hashSync(req.body.password, 12)
        }

        let newvalue = {$set: {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            postdate: req.body.datetime,
            email: req.body.email,
            password: hashPassword
        }}
 
        await req.mydb.collection("users").updateOne(myquery,newvalue)
    }

    async deleteItem(req){
        await req.mydb.collection("users").deleteOne({id:req.params.id})
    }

    async paginateItem(req,amount){
        const page = req.body.page
        return await req.mydb.collection("users").find().skip(amount*page).sort({postdate:-1,_id:-1}).limit(amount).toArray()
    }

    async postFBuser(req){
        const now = new Date();
        const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 16)

        let newUser = {
            id: req.body.id, 
            title: req.body.name,
            content: null,
            thumb: '/images/userthumb.png',
            postdate: date,
            role: 'Author',
            email: null,
            password: null,
        }
 
        await req.mydb.collection("users").insertOne(newUser)
    }
}

export default new User()