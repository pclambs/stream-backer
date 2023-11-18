const { Profile, VideoPost, Comment } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const cloudinary = require('cloudinary').v2
const path = require('path')

cloudinary.config()

const resolvers = {
  Query: {
    profiles: async () => {
      return await Profile.find()
      .populate({
        path: "uploadedVideos",
        populate: {
          path: "postedBy",
          model: 'Profile'
        }
    })
    },
    profile: async (parent, { profileId }) => {
      // console.log("resolver profileId", profileId)
      const profile = await Profile.findOne({ _id: profileId })
      .populate({
        path: "uploadedVideos",
        populate: {
          path: "postedBy",
          model: 'Profile'
        }
    })
      // console.log("resolver profile", profile)
      return profile
    },
    videoPosts: async () => {
      return await VideoPost.find()
        .populate("postedBy")
        .populate({
          path: "comments",
          populate: {
            path: "postedBy",
            model: 'Profile'
          }
        })
        .populate('postedBy')
    },
    videoPost: async (parent, { videoPostId }) => {
      return await VideoPost.findOne({ _id: videoPostId })
        .populate("postedBy")
        .populate({
          path: "comments",
          populate: {
            path: "postedBy",
            model: 'Profile'
          }
        })

    },
    comments: async (parent, { videoPostId }) => {
      return await Comment.find({ postedTo: videoPostId })
      .populate("postedBy")
    },
  },

  Mutation: {
    addProfile: async (parent, { username, email, password }) => {

      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile)

      return { token, profile }
    },
    updateProfile: async (parent, { profileId, username, email, password, bio }) => {
      return await Profile.findByIdAndUpdate(profileId, { username, email, password, bio }, { new: true })
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId }, { new: true })
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
      await Profile.findByIdAndUpdate(
        postedBy._id,
        { $push: { uploadedVideos: videoPost._id } },
        { new: true }
      )
      return videoPost
    },
    updateVideoPost: async (parent, { videoPostId, title, description, thumbnail, videoSRC }) => {
      return await VideoPost.findByIdAndUpdate(videoPostId, { title, description, thumbnail, videoSRC }, { new: true })
    },
    removeVideoPost: async (parent, { videoPostId }) => {
      return await VideoPost.findOneAndDelete({ _id: videoPostId }, { new: true })
    },
    addComment: async (parent, { commentBody, postedBy, postedTo }) => {
      const comment = await Comment.create({ commentBody, postedBy, postedTo })
      const populatedComment = await Comment.findById(comment._id).populate("postedBy")
      await VideoPost.findByIdAndUpdate(
        postedTo, 
        { $push: { comments: comment._id } },
        { new: true }
      )
      return populatedComment
    },
    updateComment: async (parent, { commentId, commentBody }) => {
      return await Comment.findByIdAndUpdate(
        commentId, 
        { commentBody }, 
        { new: true })
    },
    removeComment: async (parent, { commentId }) => {
      return await Comment.findOneAndDelete({ _id: commentId }, { new: true })
    },
    uploadVideo: async (parent, { file }) => {
      const { createReadStream } = await file
      try {
        const stream = createReadStream()
        const cloudinaryResponse = await new Promise((resolve, reject) => {
          const cloudinaryStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'video',
              transformation: [
                { width: 1000, crop: 'scale' },
                { quality: 'auto' },
                { fetch_format: 'auto' }
              ]
            },
            (error, result) => {
              if (error) {
                reject(error)
              }
              resolve(result)
            }
          )
          stream.pipe(cloudinaryStream)
        })

        console.log(cloudinaryResponse)
        return cloudinaryResponse.url
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
}

module.exports = resolvers
