const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// const VideoPost = require('./VideoPost')
// const commentSchema = require('./Comment')

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  bio: {
    type: String,
    required: false,
    maxLength: 500,
  },
  uploadedVideos: {
    type: [
      {
      type: Schema.Types.ObjectId,
      ref: "VideoPost"
      }
    ],
    default: [],
  },
}, {
  timestamps: true,
})

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;
