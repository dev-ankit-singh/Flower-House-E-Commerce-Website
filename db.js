const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/project",
   
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log("database connect"))
.catch((err)=>console.log(err));

const mongoCon=mongoose.connect;

module.exports=mongoCon


