const mongoose= require('mongoose')
const bcrypt = require('bcrypt');



    const registrationSchema =new mongoose.Schema({
        FirstName:{
            type:String,
           
             required:true
        },
        LastName:{
            type:String,
            
            required:true
        },
            Email:{
            type:String,
            
            required:true
        },
        Phone:{
            type:Number,
            
            required:true
        },
        Password:{
            type:String,
            
            required:true
        },
        CPassword:{
            type:String,
            
            required:true
        },
        
        ipaddress:{
        type:String,
        default: null
    },
    status:{
        type:String,
        enum:["new", "replied", "read"],
        default:"new",
    }
},
    {
     timestamps: true
    
});
        
    

    registrationSchema.pre("save",function(next){
        if(!this.isModified("Password")){
            return next();
        }
        this.Password=bcrypt.hashSync(this.Password, 10);
        next();
    
    })


    registrationSchema.methods.comparePassword= function(plaintext, callback){
        return callback(null, bcrypt.compareSync(plaintext, this.Password))
    };






    const userModel = mongoose.model('user_registration',registrationSchema)

    module.exports=userModel;


