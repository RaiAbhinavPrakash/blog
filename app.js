require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blogSchema");

const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");

const {
  checkForAuthenticationCookie,
} = require("./middleware/authenticationCheck");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected successfully"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // need to use to play with cookies
app.use(checkForAuthenticationCookie("token")); // the parameter name is 'token' bcz in userRoutes we give the name of our token to 'token'
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort("createdAt, -1"); // sort blog in desc order by creation date
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log("app started on port: ", PORT));
