const db = require('../config/connection')
const { Profile, VideoPost, Comment } = require('../models')
const profileSeeds = require('./profileSeeds.json')
const videoPostSeeds = require('./videoPostSeeds.json')
const commentSeeds = require('./commentSeeds.json')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
  try {
    await cleanDB('Profile', 'profiles')
    await cleanDB('VideoPost', 'videoposts')
    await cleanDB('Comment', 'comments')
    
    const profiles = await Profile.create(profileSeeds)

    const videos = []

    for (const vid of videoPostSeeds) {
      const profileId = profiles[Math.floor(Math.random() * profiles.length)]._id
      const video = await VideoPost.create({
        ...vid,
        postedBy: profileId
      })
      await Profile.findByIdAndUpdate(profileId, { $push: { uploadedVideos: video._id } })
      videos.push(video)
      // console.log(video)
    }

    for ( const comment of commentSeeds) {

      const randomVideo = videos[Math.floor(Math.random() * videos.length)]
      const createdComment = await Comment.create({
        ...comment,
        postedBy: randomVideo.postedBy,
        postedTo: randomVideo._id
      })
      
      // console.log(createdComment)

      await VideoPost.findByIdAndUpdate(
        randomVideo._id, 
        { $push: { comments: createdComment._id } },
        { new: true }
      )
    }

    console.log('all done!')
    process.exit(0)
  } catch (err) {
    throw err
  }
})