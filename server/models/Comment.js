const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  commentBody: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  postedTo: {
    type: Schema.Types.ObjectId,
    ref: "VideoPost"
  }
}, {
  timestamps: true,
})
  

const Comment = model('Comment', commentSchema)

module.exports = Comment