// models/post.js

class Post{
    async count(req,query={}){
        return await req.mydb.collection('posts').countDocuments(query)
    }

    async postItem(req){
        const id = Date.now() + Math.round(Math.random() * 1E9).toString()

        if(req.body.categories.includes(',')){
            var categories = req.body.categories.split(',')
        }else{
            var categories = [req.body.categories]
        }
        
        let newPost = {
            id: id, 
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            price: req.body.price,
            thumb: req.body.thumb,
            phone: req.body.phone,
            location: req.body.location,
            postdate: req.body.datetime,
            video: req.body.entries,
            userid: req.session.user.id,
        }
 
        await req.mydb.collection("posts").insertOne(newPost)
    }

    async getItem(req,amount,query={}){
        return await req.mydb.collection("posts").find(query).sort({date:-1,_id:-1}).limit(amount).toArray()
    }

    async editItem(req){
        return await req.mydb.collection('posts').findOne({id:req.params.id})
    }

    async updateItem(req){
        let myquery = {id: req.params.id}

        if(req.body.categories.includes(',')){
            var categories = req.body.categories.split(',')
        }else{
            var categories = [req.body.categories]
        }

        let newvalue = {$set:{
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            price: req.body.price,
            thumb: req.body.thumb,
            phone: req.body.phone,
            location: req.body.location,
            postdate: req.body.datetime,
            video: req.body.entries
        }}
 
        await req.mydb.collection("posts").updateOne(myquery,newvalue)
    }

    async deleteItem(req){
        await req.mydb.collection("posts").deleteOne({id:req.params.id})
    }

    async paginateItem(req,amount){
        const page = req.body.page
        return await req.mydb.collection("posts").find().skip(amount*page).sort({postdate:-1,_id:-1}).limit(amount).toArray()
    }

    async getRelatedItem(req,mycategories,amount){
        const myquery = {categories:{$in:mycategories},id:{$ne:req.params.id}}
        return await req.mydb.collection("posts").find(myquery).sort({postdate:-1,_id:-1}).limit(amount).toArray()
    }

    async navigateCategory(req,mycategories,amount){
        const myquery = {categories:{$in:mycategories}}
        const page = req.body.page
        return await req.mydb.collection("posts").find(myquery).skip(amount*page).sort({postdate:-1,_id:-1}).limit(amount).toArray()
    }

    async searchItem(req,amount){
        if(req.body.fsearch === 'ទាំងអស់'){
            var myquery = {$or:[{title:{$regex:req.body.q}},{content:{$regex:req.body.q}}]}
        }else{
            var myquery = {categories:{$in:[req.body.fsearch]},$or:[{title:{$regex:req.body.q}},{content:{$regex:req.body.q}}]}
        }

        return await req.mydb.collection("posts").find(myquery).limit(amount).toArray()
    }
}

export default new Post()