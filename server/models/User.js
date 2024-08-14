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

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
