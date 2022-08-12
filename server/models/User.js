const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
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
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    about: {
      type: String,
    },
    // set characteristics to be an array of data that adheres to the characteristicSchema
    characteristics: {
      type: String
    }
    ,
    favoriteTreat: {
      type: String,
    },
    image: {
      type: String,
    },
    savedDogs: [
      {
      type: Schema.Types.ObjectId,
      ref:'User'
     }
    ]
  },
  {timestamps: true},
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
