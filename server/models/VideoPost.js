const { Schema } = require('mongoose')

const videoPostSchema = new Schema ({
    title: {
        type: String,
        required: true,
        trim: true,
        
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    thumbnail: {
        // TODO Check about auto-generating 
        type: String,
        required: true,
    },
    // postedBy: {
    //     type: 
    // }
    videoSRC: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }, 
    comments: [ commentSchema ]
    
})

module.exports = videoPostSchema