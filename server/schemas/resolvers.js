const { Profile, VideoPost, Comment } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    profiles: async () => {
      return await Profile.find()
    },
    profile: async (parent, { profileId }) => {
      return await Profile.findOne({ _id: profileId })
    },
    videoPosts: async () => {
      return await VideoPost.find()
    },
    videoPost: async (parent, { videoPostId }) => {
      return await VideoPost.findOne({ _id: videoPostId })
    },
    comments: async (parent, { videoPostId }) => {
      return await Comment.find({ _id: videoPostId })
    },
  },

  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile)

      return { token, profile }
    },
    updateProfile: async (parent, {profileId, username, email, password}) => {
      return await Profile.findByIdAndUpdate(profileId, {username,email,password}, {new: true})
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId })
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email })

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addVideoPost: async (parent, { title, description, thumbnail, postedBy, videoSRC }) => {
      const videoPost = await VideoPost.create({ title, description, thumbnail, postedBy, videoSRC })
      return videoPost
    },
    updateVideoPost: async (parent, {videoPostId, title, description, thumbnail, videoSRC}) => {
      return await VideoPost.findByIdAndUpdate(videoPostId, {title, description, thumbnail, videoSRC}, {new: true})
    },
    removeVideoPost: async (parent, { videoPostId }) => {
      return await VideoPost.findOneAndDelete({ _id: videoPostId })
    },
    addComment: async (parent, { commentBody, postedBy, postedTo }) => {
      const comment = await Comment.create({ commentBody, postedBy, postedTo })
      return comment
    },
    updateComment: async (parent, {commentId, commentBody}) => {
      return await Comment.findByIdAndUpdate(commentId, {commentBody}, {new:true})
    },
    removeComment: async (parent, { commentId }) => {
      return await Comment.findOneAndDelete({ _id: commentId })
    },
    
  },
}

module.exports = resolvers
