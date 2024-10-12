const { Router } = require("express");
const { createHmac } = require("crypto");
const User = require("../models/userSchema");
const { createTokenForUser } = require("../services/authentication");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).render("signup", { error: "User already exist" });
  }
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("signin", { error: "User does not exist" });
    }

    // 2. Hash the entered password using the stored salt
    const hashedPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    // 3. Compare the hashed passwords
    if (hashedPassword !== user.password) {
      return res.status(400).render("signin", { error: "Password is Incorrect" });
    }

    const token = createTokenForUser(user);

    console.log(token);
    
    // 4. If passwords match, login is successful
    return res.cookie('token', token).redirect("/");

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token').redirect('/') // clear the cookie and redirect to home pade. clearing cookie will remove user from cookie
})

module.exports = router
