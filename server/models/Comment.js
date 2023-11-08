const { Schema, model } = require('mongoose');
// const VideoPost = require('./VideoPost');


const commentSchema = new Schema({
  commentBody: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  videoPostedTo: {
    type: Schema.Types.ObjectId,
    ref: "VideoPost"
 }
  
});


const Comment = model('Comment', commentSchema)

module.exports = Comment