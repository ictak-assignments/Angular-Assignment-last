const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
const session = require('express-session');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bookRoutes = require("./routes/bookRoutes"); //book-pages
const authorRoutes = require("./routes/authorRoutes");
const loginRoutes = require("./routes/loginRoutes");

//===================== connecting our database=====================================
mongoose.connect("mongodb://localhost:27017/bookself-old", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
//======================== creating our application===================================
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", loginRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

const sessionConfig = {
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));

app.listen(port, () => {
  console.log("Serving on port number" + port);
});
