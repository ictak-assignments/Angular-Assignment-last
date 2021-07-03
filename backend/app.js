const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpresError');
const BookData = require('./model/book');
const AuthorData = require('./model/author');
const cors = require('cors');
const jwt = require('jsonwebtoken')
username='admin';
password='1234';

//===================== connecting our database
mongoose.connect('mongodb://localhost:27017/bookself-old', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


//======================== creating our application
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//============================ this is to verify with jwt =============================

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }


app.get('/',(req,res)=>{
    res.send("welcome sinan")
});
app.post('/login', (req, res) => {
    let userData = req.body
        if (!username) {
          res.status(401).send('Invalid Username')
        } else if ( password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: username+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
    });

app.get('/books',async (req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS");
    const books = await BookData.find();
    return res.send(books);
});

app.post('/books',verifyToken, async function(req,res){
    console.log(req.body.book)
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS");
    var book4saving = new BookData(req.body.book);
    await book4saving.save();
});

app.get('/books/:id', async (req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS");
    const book = await BookData.findById(req.params.id)
	return res.send(book);
});

app.put('/books/:id',verifyToken, async (req, res) => {
    const { id } = req.params;
    console.log(req.body.book)
    const book = await BookData.findByIdAndUpdate(id, { ...req.body.book });
})

app.delete('/books/:id',verifyToken, async (req, res) => {
    await BookData.findByIdAndDelete(req.params.id);
});

// ========================== Author Routes =======================================//
app.get('/authors',async (req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS");
    const authors = await AuthorData.find({})
    return res.send(authors);
    // AuthorData.find()
    //             .then(function(authors){
    //                 return res.send(authors);
    //             });
});

app.post('/authors',verifyToken, async function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS");
    console.log(req.body.author)
   //  var author = {       
   //      name : req.body.author.name,
   //      image:req.body.author.image,
   //      nationality:req.body.author.nationality,
   //      description: req.body.author.description,
   // }       
   var author4saving = new AuthorData(req.body.author);
    await author4saving.save();
});
app.get('/authors/:id', async (req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS");
    const author = await AuthorData.findById(req.params.id)
	return res.send(author);
    // AuthorData.findById(req.params.id)
    // .then(function(author){
    //     return res.send(author)
    // })
    
});
app.put('/authors/:id',verifyToken, async (req, res) => {
    const { id } = req.params;
    console.log(req.body.author)
    // id = req.body.item._id;
    // name = req.body.item.name;
    // image = req.body.item.image;
    // description = req.body.item.description;
    // nationality = req.body.item.nationality;
    // const author = await AuthorData.findByIdAndUpdate({"_id":id},
    //                                         {
    //                                             $set: {"_id":id,
    //                                                 "name":name,
    //                                             "image":image,
    //                                             "description":description,
    //                                             "nationality":nationality }
    //                                         }
    // );
    const author = await AuthorData.findByIdAndUpdate(id, { ...req.body.author });
    })

app.delete('/authors/:id',verifyToken, async (req, res) => {
    await AuthorData.findByIdAndDelete(req.params.id)
    // const deletedProduct = await AuthorData.findByIdAndDelete(id,function(err,docs){
    //     if(err){ console.log(err) }
    //     else { console.log('deletion success',docs) }
    // }
    // );
    
});

// // To Delete The Employee
// employeeRoute.route('/deleteEmployee/:id').get(function (req, res) {
//     employeeModel.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
//     if (err) res.json(err);
//     else res.json('Employee Deleted Successfully');
//     });
//    });


app.listen(port, () => {
    console.log('Serving on port number'+port);
})







