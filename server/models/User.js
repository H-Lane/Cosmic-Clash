const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

// Create our User Schema taking in a username, email, and password
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    createIndexes: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

// This is a pre-save hook that hashes the user's password so the raw password is never saved in our db
userSchema.pre("save", async function (next) {
  var user = this;

  // Only hash the password if the User has been modified (Or it is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a Salt for hashing
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);

      //hash the pw using the newly generated Salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  } catch (err) {
    return next(err);
  }
});

// Create a method the schema has access to that compares a given pw for login against the hashed pw in our db
userSchema.methods.validatePassword = async function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = model("User", userSchema);

module.exports = User;
