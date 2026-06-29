const express = require("express");
require("dotenv").config();
const multer = require("multer");
const app = express();
const router = express.Router();

///////////// requireing mongo connection/////////
const mongoCon = require("./db");
const userModel = require("./model/registersSchema");
const productModel = require("./model/productSchema");
const contactModel = require("./model/contactschema");

const bodyParser = require("body-parser");
const { model } = require("mongoose");
const { fileLoader } = require("ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// cookies
var cookiewParser = require("cookie-parser");
var session = require("express-session");

const cookieParser = require("cookie-parser");

// mongoose.set('strictQuery', false);

app.set("view engine", "ejs");

app.use(express.static("views"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/assert", express.static("assert"));
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  }),
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
    res.redirect("/dashboard/index");
  }
  next();
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about_us", (req, res) => {
  res.render("about_us");
});




router.get('/login', (req, res) => {
    res.render('login', {
        emailError: null,
        passwordError: null
    });
});





router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await userModel.findOne({ Email });

        if (!user) {
            return res.render('login', {
                emailError: 'Email not found',
                passwordError: null
            });
        }

        user.comparePassword(Password, (err, match) => {

            if (err) {
                console.log(err);
                return res.render('login', {
                    error: 'Something went wrong'
                });
            }

            if (!match) {
                return res.render('login', {
                    passwordError: 'Incorrect password',
                    emailError: null
                });
            }

            req.session.user = user;

            console.log("Email & Password Match");

            return res.redirect('/dashboard/index');
        });

    } catch (error) {
        console.log(error);

        return res.render('login', {
            error: 'Server Error'
        });
    }
});









router.get("/search_bar", (req, res) => {
  res.render("search_bar");
});

router.get("/gema", (req, res) => {
  res.render("gema");
});

router.get("/sustainability", (req, res) => {
  res.render("sustainability");
});

router.get("/collections", (req, res) => {
  res.render("collections");
});

router.get("/award", (req, res) => {
  res.render("award");
});
router.get("/signup", (req, res) => {
  res.render("/");
});
// router.get('/dashboard/index',function(req,res){
//     if(req.session.user && req.cookies.user_sid){
//     res.render('dashboard/index')
//     }
//     else{
//         res.redirect('/login')
//     }
// });

// router.get('/view-contact',(req,res)=>{
//     res.render('dashboard/view-contact')
// })

// start contact us connection get

router.get("/contact_us", (req, res) => {
  res.render("contact_us", {
    success: req.query.success
  });
});

// contact us api
router.post("/contact_us", (req, res) => {
  var usercontact = new contactModel({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    message: req.body.message,
  });

  usercontact
    .save()
    .then(() => {
      console.log(200);
     res.redirect("/contact_us?success=true");
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get('/view-contact', async(req,res)=>{
//     try{
//         const viewcontacts=await contactModel.find({});
//         res.render('dashboard/view-contact',{viewcontacts: viewcontacts});
//         console.log(viewcontacts);
//     }catch(err){
//         console.log(err)
//     }
// });

//delete api contact

// router.get("/delete3/:id", async (req, res)=>{
//     try{
//         const viewcontacts = await contactModel.findByIdAndRemove(req.params.id);
//         console.log(viewcontacts)
//         res.redirect('../view-contact')

//         // res.send('<script>"window.location.href://localhost:2000/viewmovie";</script>')
//     } catch(err){
//         console.log(err);
//     }
// });

//     // edit api contact
// router.get("/edit2/:id",async(req,res)=>{
//     try{
//         const editcontact= await userModel.findById({_id : req.params.id});
//         res.render("dashboard/edit-registration",{editcontact:editcontact});
//         console.log(editcontact)
//     } catch(err){
//             console.log(err);
// }
// });

/////////////////////////////////////// start Create registration api , get , post , delete , edit , update///////////////////////////////////////

router.get("/registration", (req, res) => {
  res.render("registration");
});

////////////////////////////// create registration API //////////////////////////////

router.post("/registration", (req, res) => {
  var user = new userModel({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Password: req.body.Password,
    CPassword: req.body.CPassword,
  });
  user
    .save()
    .then(() => {
      console.log("saved data");
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
});

//////////// dashboard view-registration get render////////////////

// router.get("/view-registration",async(req,res)=>{
//     try{
//         const viewdata =await userModel.find({})
//         res.render('dashboard/view-registration',{viewdata: viewdata});
//         console.log(viewdata);
//     }catch(err){
//         console.log(err);
//     }
//     });

//delete api registration

// router.get("/delete/:id", async (req, res)=>{
//     try{
//         const data = await userModel.findByIdAndRemove(req.params.id);
//         console.log(data)
//         res.redirect('../view-registration')
// M
//         // res.send('<script>"window.location.href://localhost:2000/viewmovie";</script>')
//     } catch(err){
//         console.log(err);
//     }
// });

// // edit api registration
// router.get("/edit/:id",async(req,res)=>{
//     try{
//         const editData= await userModel.findById({_id : req.params.id});
//         res.render("dashboard/edit-registration",{editData:editData});
//         console.log(editData)
//     } catch(err){
//             console.log(err);
// }
// });

////////////////////////////// update api  //////////////////////////////

// router.post("/edit/:id", async(req, res)=>{
//     try{
//     const update=({
//         FirstName: req.body.FirstName,
//         LastName : req.body.LastName,
//         Email    : req.body.Email,
//         Phone    : req.body.Phone,
//         Password : req.body.Password,
//         CPassword: req.body.CPassword

//     });

//         const updatedatas= await userModel.findByIdAndUpdate(req.params.id,update);
//         res.redirect("../view-registration");
//         console.log(updatedatas)
//     }

//     catch(err){
//         console.log(err);
//     }
// });

/////////////////////////////////////// End Create registration api , get , post , delete , edit , update///////////////////////////////////////

// ///////////////////product api /////////////////////////

// file upload

// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null, './upload');
//     },

//     filename: (req,file,cb)=>{
//         cb(null, file.originalname);
//         //cb(null, uuidv4()+'-'+ Date.now() +path.extname(file.originalname));
//     }
// });

// const fileFilter = (req,file,cb)=>{
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if(allowedFileTypes.includes(file.mimetype)){
//         cb(null,true);
//     } else{
//         cb(null,flase);
//     }
// }

// let upload = multer({storage, fileFilter});

router.get("/add-product", (req, res) => {
  res.render("dashboard/add-product");
});

// router.get("/",async(req,res)=>{
//     try{
//         const productdata =await productModel.find({})
//         res.render('index',{productdata: productdata});
//         console.log(productdata);
//     }catch(err){
//         console.log(err);
//     }
//     });

//////////////////////////////// create add-product API/////////////////////////////////////
// router.post('/add-product', upload.single('fileupload'),(req,res)=>{
//     var userproduct = {
//         productname       : req.body.productname,
//         productdescription: req.body.productdescription,
//         price             : req.body.price,
//         fileupload       : req.file.filename
//         }

//     var addproduct=new  productModel(userproduct);
//     addproduct.save()
//     .then(()=>{
//         console.log("saved data");

//     })
//     .catch((err)=>{
//         console.log(err);

//     });
// });

//////////// dashboard app-product////////////////

// router.get('/view-product',(req,res)=>{
//     res.render('dashboard/view-product')
// })

// router.get("/view-product",async(req,res)=>{
//     try{
//         const productdata =await productModel.find({})
//         res.render('dashboard/view-product',{productdata: productdata});
//         console.log(productdata);
//     }catch(err){
//         console.log(err);
//     }
//     });

//delete api view-product

// router.get("/delete2/:id", async (req, res)=>{
//     try{
//         const datas = await productModel.findByIdAndRemove(req.params.id);
//         console.log(datas)
//         res.redirect('../view-product')

//     } catch(err){
//         console.log(err);
//     }
// });

app.use("/", router);

app.listen(2001, () => {
  console.log("Your API is available on port 2001");
});

// require('./db')
