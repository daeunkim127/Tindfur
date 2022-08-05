const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const characteristicSchema = require('./Characteristic');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
    },
    // set characteristics to be an array of data that adheres to the characteristicSchema
    characteristics: [characteristicSchema],
    favoriteTreat: {
      type: String,
    },
    image: {
      type: String,
    },
    favoriteUsers: [userSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `favoriteCount` with the number of favorited users we have
userSchema.virtual('favoriteCount').get(function () {
  return this.favoriteUsers.length;
});

const User = model('User', userSchema);

module.exports = User;
