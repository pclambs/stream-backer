const { Schema, model } = require('mongoose')
const commentSchema = require('./Comment')

const videoPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  thumbnail: {
    // TODO Check about auto-generating
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    ref: "Profile",
  },
  videoSRC: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
//   comments: [commentSchema],
});

const VideoPost = model('VideoPost', videoPostSchema)

module.exports = VideoPost