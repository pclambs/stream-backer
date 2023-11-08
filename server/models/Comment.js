const { Schema, model } = require('mongoose');
// const VideoPost = require('./VideoPost');


const commentSchema = new Schema({
  commentBody: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  postedBy: {
    type: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    required: true,
  },
  postedTo: {
    type: {
      type: Schema.Types.ObjectId,
      ref: "VideoPost"
   },
   required: true,
  },
}, {
  timestamps: true,
});


const Comment = model('Comment', commentSchema)

module.exports = Comment