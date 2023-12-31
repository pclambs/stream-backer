const { Schema, model } = require('mongoose')

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
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
  timestamps: true,
})

const VideoPost = model('VideoPost', videoPostSchema)

module.exports = VideoPost