// const express=require('express')'
// const app=express();

const mongoose = require('mongoose');

mongoose.connect
("mongodb://localhost:27017/Createdata",
    
// mongoose.connect("mongodb://0.0.0.0:27017/",

{
    useNewUrlParser:true,
    useUnifiedTopology: true
})


.then(()=>console.log("connection successfully.."))
.catch((err)=>console.log(err));


//schema
//a mongoose  schema defines the structure of the document
//default values , validatior ,etc......

const listSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    }
//active:Boolean,
// date:
// {
//     type:Date,
//     default:Date.now
// }

});

//A mongoose model is a wrapper on the mongoose schema 
// mongoose model provides and interface to the database for creating , quering , updating , deleting  records , etc

//collection creation

//inp when we pass const varible its call class
//so it should be start with caps 

const Playlist = new mongoose.model("Playlist",listSchema);
//Playlist perameter is a name of collection name and its only define singular form  

//CREATE DOCUMENT OR INSERT
const createDocument = async()=>{

    try {
        const user1 = new Playlist({
            name:'sita',
            Email:"siya@gmail.com"
        })

        const user2 = new Playlist({
            name:'Rakesh',
            Email:"rakesh@gmail.com"
        })
        const user3 = new Playlist({
            name:'Rohit',
            Email:"rohit@gmail.com"
        })

        const user4 = new Playlist({
            name:'kapil',
            Email:"kapil@gmail.com"
        })

        const result = await Playlist.insertMany([user1,user2,user3,user4,])
        console.log(result);
    } catch (err){
        console.log(err);
    }
    }

createDocument();


const getDocument=async()=>{
    const result= await Playlist.find();
    console.log(result);
}

getDocument();
