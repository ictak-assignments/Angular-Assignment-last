const express = require("express");
const router = express.Router();
const AuthorData = require("../model/author");
const { verifyToken } = require("../middleware");

// ========================== Author Routes =======================================//
router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
  );
  const authors = await AuthorData.find({});
  return res.send(authors);
  // AuthorData.find()
  //             .then(function(authors){
  //                 return res.send(authors);
  //             });
});

router.post("/", verifyToken, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
  );
  console.log(req.body.author);
  //  var author = {
  //      name : req.body.author.name,
  //      image:req.body.author.image,
  //      nationality:req.body.author.nationality,
  //      description: req.body.author.description,
  // }
  var author4saving = new AuthorData(req.body.author);
  await author4saving.save();
});
router.get("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
  );
  const author = await AuthorData.findById(req.params.id);
  return res.send(author);
  // AuthorData.findById(req.params.id)
  // .then(function(author){
  //     return res.send(author)
  // })
});
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  console.log(req.body.author);
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
});

router.delete("/:id", verifyToken, async (req, res) => {
  await AuthorData.findByIdAndDelete(req.params.id);
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
module.exports = router
