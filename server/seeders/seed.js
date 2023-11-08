const db = require('../config/connection')
const { Profile } = require('../models')
const profileSeeds = require('./profileSeeds.json')
const videoPostSeeds = require('./videoPostSeeds.json')
const commentSeeds = require('./commentSeeds.json')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
  try {
    await cleanDB('Profile', 'profiles')
    await cleanDB('VideoPost', 'videoposts')
    await cleanDB('Comment', 'comments')
    
    await Profile.create(profileSeeds);
    await Profile.create(videoPostSeeds);
    await Profile.create(commentSeeds);

    console.log('all done!')
    process.exit(0)
  } catch (err) {
    throw err
  }
})