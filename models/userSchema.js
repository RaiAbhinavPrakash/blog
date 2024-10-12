const { Schema, mongoose } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/userAvatar.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// whenever the new user is created and saved it will execute
userSchema.pre("save", function (next) {
  const user = this;

  //return is password is not modified
  if (!user.isModified("password")) return;

  // if user gives password then hash it
  const salt = randomBytes(16).toString(); // create salt of length 16
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
