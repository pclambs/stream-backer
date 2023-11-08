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
    maxlength: 800,
  },
  thumbnail: {
    // TODO Check about auto-generating
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  videoSRC: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const VideoPost = model('VideoPost', videoPostSchema)

module.exports = VideoPost