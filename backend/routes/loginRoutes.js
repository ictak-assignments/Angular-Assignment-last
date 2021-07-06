const express = require("express");
const router = express.Router();
const UserData = require("../model/user");
const { verifyToken } = require("../middleware");

router.post("/login", function (req, res) {
  console.log(req.body)
  let userName = req.body.uname;
  let password = req.body.password;

  if (userName == "admin" && password == "1234") {
    req.session.role = "admin";
    console.log("admin login success");
    let payload = { subject: username + password, admin: true };
    let token = jwt.sign(payload, "secretKey");
    res.send({ status: true, token, role: req.session.role });
  } else {
    UserData.findOne(
      { username: userName, password: password },
      function (err, user) {
        console.log(req.body, "mongodbcheck for user");
        if (err) {
          res.send({ status: false, data: "No such User" });
        } else if (user) {
          console.log("local user login success");
          req.session.role = "user";
          let payload = { subject: username + password, admin: false };
          let token = jwt.sign(payload, "secretKey");
          res.send({ status: true, token, role: req.session.role });
          console.log({ status: true, token, role: "user" });
        } else {
          res.send({ status: false, data: "NOT FOUND" });
        }
        console.log("user data", user);
      }
    );
  }
});

//signup data insert to mongo db

router.post("/register", function (req, res) {
  let item = {
    username: req.body.user.username,
    password: req.body.user.password,
    email: req.body.user.email
  };

  let user = UserData(item);
  user
    .save()
    .then(function (data) {
      res.send(true);
    })
    .catch(function (error) {
      res.send(false);
    });
});

module.exports = router;
