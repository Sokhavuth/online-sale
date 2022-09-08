// models/category.js

class Category{
    async count(req){
        return await req.mydb.collection('categories').countDocuments()
    }

    async postItem(req){
        const id = Date.now() + Math.round(Math.random() * 1E9).toString()
 
        let newCategory = {
            id: id, 
            title: req.body.title,
            thumb: req.body.thumb,
            postdate: req.body.datetime
        }
 
        await req.mydb.collection("categories").insertOne(newCategory)
    }

    async getItem(req,amount){
        return await req.mydb.collection("categories").find().sort({date:-1,_id:-1}).limit(amount).toArray()
    }

    async getAllItem(req){
        return await req.mydb.collection("categories").find().sort({title:1}).toArray()
    }

    async editItem(req){
        return await req.mydb.collection('categories').findOne({id:req.params.id})
    }

    async updateItem(req){
        let myquery = {id: req.params.id}
        let newvalue = {$set: {
            title: req.body.title,
            thumb: req.body.thumb,
            postdate: req.body.datetime
        }}
 
        await req.mydb.collection("categories").updateOne(myquery,newvalue)
    }

    async deleteItem(req){
        await req.mydb.collection("categories").deleteOne({id:req.params.id})
    }

    async paginateItem(req,amount){
        const page = req.body.page
        return await req.mydb.collection("categories").find().skip(amount*page).sort({postdate:-1,_id:-1}).limit(amount).toArray()
    }
}

export default new Category()