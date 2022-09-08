// models/conMongoDB.js
// npm install mongodb
// npm install dotenv
 
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.DATABASE_URI
 
let resultPromise = new Promise(function(resolve,reject){
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
        if (err) throw err
        const mydb = db.db("sale")
        if(mydb){
            resolve(mydb)
            console.log('Connected to the main database!!')
        }else{
            reject("Error occured!")
        }
    })
})
 
async function awaitPromise(){
    let mydb = await resultPromise
    return mydb
}
 
export default awaitPromise()