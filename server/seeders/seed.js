const db = require('../config/connection');
const { Profile } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Profile', 'profiles');
    
    await Profile.create(profileSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
